import { View, StyleSheet, Image, Text } from "react-native";
import { Stack } from "expo-router";
import { TeleportHome } from "@components";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        name="not-found"
        options={{
          title: "Oops! Not Found",
        }}
      />
      <View className="flex flex-col items-center justify-center gap-8 px-8">
        <Image
          source={require("../assets/404.jpg")}
          className="rounded-full"
          style={styles.image}
          testID="not-found-image"
        />
        <View className="flex flex-col gap-2 px-4 py-3 bg-green-200 rounded-2xl">
          <Text className="flex text-xl font-medium text-center text-green-900">
            PAGE DOES NOT EXIST IN THIS DIMENSION
          </Text>
          <Text className="text-lg font-medium text-center text-green-900">
            Please try another reality or go back to homepage.
          </Text>
        </View>

        <TeleportHome />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
});
