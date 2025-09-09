import { useEffect, useRef } from "react";
import { Animated, Easing, ViewStyle } from "react-native";

interface Props {
  width: number;
  height?: number;
  style?: ViewStyle;
}

export function Skeleton({ width, height = 15, style = {} }: Props) {
  const colorAnim = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim.current, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim.current, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = colorAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", "#919191"],
  });

  return (
    <Animated.View
      style={{ backgroundColor, width, height, borderRadius: 100, ...style }}
    />
  );
}
