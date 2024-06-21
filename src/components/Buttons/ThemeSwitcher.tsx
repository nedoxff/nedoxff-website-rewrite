import { useEffect, useState } from "react";

import DarkThemeIcon from "../../assets/icons/dark_mode.svg";
import LightThemeIcon from "../../assets/icons/light_mode.svg";
import { updateTheme } from "../../helpers/utilities";
import { useStoreon } from "storeon/react";
import { AppEvents, AppState } from "../../helpers/state";

export default function ThemeSwitcher() {
  const { dispatch, theme } = useStoreon<AppState, AppEvents>("theme");

  return (
    <button
      className="group flex h-min items-center justify-center self-start rounded-full border-2 border-dark bg-white p-2 transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-white dark:bg-dark hover:dark:bg-white"
      onClick={() => dispatch("set", theme === "dark" ? "light" : "dark")}
    >
      <img
        src={theme === "dark" ? LightThemeIcon : DarkThemeIcon}
        className="transition-all duration-[500] ease-in-out-quad group-hover:invert dark:invert group-hover:dark:invert-0 w-9"
        alt="theme icon"
      />
    </button>
  );
}
