import React from "react";
import Loadingbar from "react-colored-loading-bar";
import { defaultTheme } from "../styles/theme";

const { colors } = defaultTheme;

const LoadingBar = () => {
  return (
    <Loadingbar
      colors={[colors.yellow, colors.purple, colors.green, colors.red]}
      height={5}
      cycleDurationInMs={200}
      positionAtTop={true}
    ></Loadingbar>
  );
};

export default LoadingBar;
