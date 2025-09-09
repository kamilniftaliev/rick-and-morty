import { View } from "react-native";
import { Skeleton } from "./Skeleton";

export function CharactersListSkeleton() {
  return (
    <View className="flex flex-col items-center gap-4 px-4 py-4 bg-white rounded-xl">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <View className="flex flex-row items-center w-full gap-2" key={i}>
            <Skeleton width={50} height={50} />
            <View className="flex flex-col gap-3 grow">
              <Skeleton width={140} />
              <Skeleton width={70} height={13} />
            </View>
            <Skeleton width={50} height={26} />
          </View>
        ))}
    </View>
  );
}
