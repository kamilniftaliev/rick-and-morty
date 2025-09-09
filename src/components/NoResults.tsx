import { Image, StyleSheet, Text, View } from "react-native";

export function NoResults() {
  return (
    <View className="flex flex-col items-center gap-8 p-12 bg-white rounded-lg">
      <View className="overflow-hidden w-60 h-60 rounded-3xl">
        <Image
          resizeMode="cover"
          style={styles.image}
          source={require("../../assets/rick.jpg")}
          testID="rick-image"
        />
      </View>
      <Text className="text-xl font-medium text-center">
        This is a waste of perfectly good electricity. Try again, but with a
        brain this time.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
