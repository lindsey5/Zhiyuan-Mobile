import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const BASE_WIDTH = 450;

export default function responsiveFontSize(size: number) {
  return Math.round((size * SCREEN_WIDTH) / BASE_WIDTH);
}