import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { TeleportHome } from "./TeleportHome";
import { cn } from "@utils";

interface Props {
  message?: string;
  className?: string;
  canGoHome?: boolean;
  retry: () => void;
}

export function ErrorMessage({
  message = "Something went wrong.",
  retry,
  className,
  canGoHome = true,
}: Props) {
  return (
    <View className={cn("flex flex-col items-center gap-6 px-8", className)}>
      <Image
        source={require("../../assets/error.jpg")}
        className="rounded-full"
        style={styles.image}
        testID="error-image"
      />
      <Text className="text-5xl font-bold">OOPS...</Text>
      <Text className="text-xl font-medium text-red-700">{message}</Text>

      <Pressable
        className="w-2/3 px-3 py-2 bg-red-600 border-2 border-red-900 rounded-full"
        onPress={() => retry()}
      >
        <Text className="text-xl font-medium text-center text-white">
          Let`s Try Again
        </Text>
      </Pressable>
      {canGoHome && <TeleportHome />}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
});
