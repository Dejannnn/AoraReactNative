/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#FFA001';
const tintColorDark = "#FFA001";
const inactiveTintColorLight = "#CDCDE0"
const inactiveTintColorDark = "#CDCDE0";


export const Colors = {
  light: {
    text: "#11181C",
    background: "#161622",
    tint: tintColorLight,
    inactiveTint: inactiveTintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#161622",
    tint: tintColorDark,
    inactiveTint: inactiveTintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
