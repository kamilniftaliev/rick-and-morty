import { useCallback, useMemo } from "react";
import { View, Text, Image } from "react-native";
import { ErrorMessage, Skeleton } from "@components";
import { useGetCharacterQuery } from "@graphql";
import { Redirect, useLocalSearchParams } from "expo-router";
import { RANDOM_IMAGE_URL } from "@constants";

export default function Character() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data, loading, error, refetch } = useGetCharacterQuery({
    variables: { id },
    returnPartialData: true,
  });

  const character = data?.character;

  const fields = useMemo(
    () => [
      {
        label: "Species",
        value: character?.species,
      },
      {
        label: "Status",
        value: character?.status,
      },
      {
        label: "Gender",
        value: character?.gender,
      },
      {
        label: "Origin",
        value: character?.origin?.name,
      },
      {
        label: "Location",
        value: character?.location
          ? `${character.location.type} - ${character.location.name}`
          : null,
      },
    ],
    [character]
  );

  const renderFields = useCallback(
    ({
      label,
      value,
    }: {
      label: (typeof fields)[number]["label"];
      value: (typeof fields)[number]["value"];
    }) => {
      if (!value && !loading) return null;

      const isLoadingThisField = loading && !value;

      return (
        <View
          key={label}
          className="flex flex-row items-center justify-between w-full gap-2"
        >
          {isLoadingThisField ? (
            <Skeleton style={{ marginVertical: 6 }} width={80} />
          ) : (
            <Text className="text-lg font-medium">{label}</Text>
          )}

          {isLoadingThisField ? (
            <Skeleton style={{ marginVertical: 6 }} width={80} />
          ) : (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="w-2/3 text-lg font-medium text-right text-green-800"
            >
              {value}
            </Text>
          )}
        </View>
      );
    },
    [loading]
  );

  if (error) {
    return <ErrorMessage retry={refetch} />;
  }

  if (!character && !loading) {
    return <Redirect href="+not-found" />;
  }

  return (
    <View className="flex flex-col items-center gap-4 ">
      {loading && !character?.image ? (
        <Skeleton width={170} height={170} />
      ) : (
        <Image
          source={{ uri: character?.image || RANDOM_IMAGE_URL }}
          className="w-1/2 border-4 border-white rounded-full aspect-square"
          testID="character-avatar"
        />
      )}
      <View className="mt-4">
        {loading && !character?.name ? (
          <Skeleton width={150} height={25} />
        ) : (
          <Text className="text-3xl font-bold text-center">
            {character?.name || "No Name"}
          </Text>
        )}
      </View>
      <View className="flex flex-col items-center w-full gap-2 p-4 bg-white rounded-xl">
        {loading ? (
          <Skeleton width={150} height={28} />
        ) : (
          <Text className="text-2xl font-semibold text-center">
            Information
          </Text>
        )}
        {fields.map(renderFields)}
      </View>
    </View>
  );
}
