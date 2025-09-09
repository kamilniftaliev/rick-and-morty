import { useState, useRef, useEffect, useCallback } from "react";
import { TextInput, ActivityIndicator, View } from "react-native";
import { NetworkStatus } from "@apollo/client";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import {
  CharacterListItem,
  type CharacterListItemProps,
  CharactersListSkeleton,
  ErrorMessage,
  NoResults,
} from "@components";
import { Character, useGetCharactersQuery } from "@graphql";

let refetchTimeout: ReturnType<typeof setTimeout> | undefined = undefined;

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setStatus] = useState("");
  const [selectedGender, setGender] = useState("");
  const listRef = useRef<FlashListRef<Character>>(null);
  const canApplyFilters = useRef(false);
  const isFocused = useIsFocused();

  const { data, loading, error, fetchMore, networkStatus, refetch } =
    useGetCharactersQuery();

  const characters = (data?.characters?.results || []) as Character[];
  const next = data?.characters?.info?.next;

  const isReady = networkStatus === NetworkStatus.ready;

  const handleLoadMore = useCallback(() => {
    if (next && isReady && isFocused) {
      fetchMore({ variables: { page: next } });
    }
  }, [fetchMore, isReady, next, isFocused]);

  const renderItem = useCallback(
    ({ item }: CharacterListItemProps) => <CharacterListItem item={item} />,
    []
  );

  useEffect(() => {
    if (!canApplyFilters.current) {
      canApplyFilters.current = true;
      return;
    }

    refetchTimeout = setTimeout(() => {
      refetch({
        page: 1,
        filter: {
          name: searchTerm.trim(),
          status: selectedStatus,
          gender: selectedGender,
        },
      });

      listRef.current?.scrollToTop({ animated: true });
    }, 500);

    return () => {
      clearTimeout(refetchTimeout);
    };
  }, [refetch, searchTerm, selectedStatus, selectedGender]);

  const isInitialLoading =
    loading &&
    [NetworkStatus.loading, NetworkStatus.refetch].includes(networkStatus);

  return (
    <>
      <TextInput
        className="px-4 py-3 text-lg leading-5 bg-white rounded-lg focus:outline-none"
        placeholder="Search by name"
        value={searchTerm}
        testID="search-field"
        onChangeText={setSearchTerm}
      />
      <View className="flex flex-row justify-between gap-2.5">
        <View className="px-2 overflow-hidden bg-white rounded-lg web:py-2 grow">
          <Picker
            selectedValue={selectedStatus}
            onValueChange={setStatus}
            testID="status-picker"
          >
            <Picker.Item label="Any Status" value="" />
            <Picker.Item label="Alive" value="alive" />
            <Picker.Item label="Dead" value="dead" />
            <Picker.Item label="Unknown" value="unknown" />
          </Picker>
        </View>
        <View className="px-2 overflow-hidden bg-white rounded-lg web:py-2 grow">
          <Picker
            selectedValue={selectedGender}
            onValueChange={setGender}
            testID="gender-picker"
          >
            <Picker.Item label="Any Gender" value="" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Genderless" value="genderless" />
            <Picker.Item label="Unknown" value="unknown" />
          </Picker>
        </View>
      </View>
      {isInitialLoading ? (
        <CharactersListSkeleton />
      ) : error ? (
        <ErrorMessage className="mt-6" canGoHome={false} retry={refetch} />
      ) : characters.length ? (
        <View className="flex flex-1 py-2 bg-white rounded-xl">
          <FlashList
            data={characters}
            renderItem={renderItem}
            keyExtractor={(item) => item.id || ""}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            onRefresh={refetch}
            ref={listRef}
            refreshing={networkStatus === NetworkStatus.refetch}
            ListFooterComponent={
              networkStatus === NetworkStatus.fetchMore ? (
                <ActivityIndicator size={30} className="my-8" />
              ) : null
            }
          />
        </View>
      ) : (
        <NoResults />
      )}
    </>
  );
}
