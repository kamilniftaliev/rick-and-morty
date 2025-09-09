import { memo } from "react";
import { View, Text, Image } from "react-native";
import { Link } from "expo-router";
import { Character } from "@graphql/generated";
import { cn } from "@utils";
import { RANDOM_IMAGE_URL } from "@constants";

export interface CharacterListItemProps {
  item: Character;
}

export const CharacterListItem = memo(function CharacterListItem({
  item,
}: CharacterListItemProps) {
  const isAlive = item.status === "Alive";
  const isDead = item.status === "Dead";

  return (
    <Link
      href={{
        pathname: "/character/[id]",
        params: { id: item.id },
      }}
    >
      <View className="flex flex-row items-center gap-2 px-4 py-2">
        <Image
          source={{ uri: item.image || RANDOM_IMAGE_URL }}
          className="border-2 border-gray-600 rounded-full w-14 h-14"
          testID="character-avatar"
        />
        <View className="flex flex-1 grow">
          <Text
            className="text-lg font-bold"
            numberOfLines={1}
            ellipsizeMode="tail"
            testID="character-name"
          >
            {item.name}
          </Text>
          <Text testID="character-species">{item.species}</Text>
        </View>
        <Text
          testID="character-status"
          className={cn("py-1 px-2 rounded-full text-white", {
            "bg-green-700": isAlive,
            "bg-red-700": isDead,
            "bg-gray-400": !isAlive && !isDead,
          })}
        >
          {item.status}
        </Text>
      </View>
    </Link>
  );
});
