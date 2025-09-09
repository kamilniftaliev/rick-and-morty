import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@graphql";
import { Image, StyleSheet, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

import "../src/global.css";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <ApolloProvider client={apolloClient}>
        <SafeAreaView className="h-full bg-gray-200">
          <View className="h-full px-3 web:py-3">
            <Stack
              screenOptions={{
                header: ({ back, navigation }) => {
                  return (
                    <View className="flex flex-row items-center justify-center bg-gray-200">
                      {back && (
                        <Entypo
                          onPress={navigation.goBack}
                          name="chevron-with-circle-left"
                          size={36}
                          color="green"
                          className="-mr-9"
                        />
                      )}
                      <Link href="/" className="mx-auto my-2">
                        <Image
                          resizeMode="contain"
                          style={styles.logo}
                          source={require("../assets/logo.png")}
                        />
                      </Link>
                    </View>
                  );
                },
                contentStyle: {
                  backgroundColor: "#e5e7eb",
                  gap: 10,
                },
              }}
            >
              <Stack.Screen
                name="index"
                options={{
                  unmountOnBlur: true,
                }}
              />
              <Stack.Screen name="character/[id]" />
            </Stack>
          </View>
        </SafeAreaView>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 50,
  },
});
