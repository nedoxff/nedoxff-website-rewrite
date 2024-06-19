import { useEffect, useState } from "react";

import DarkThemeIcon from "../../assets/icons/dark_mode.svg";
import LightThemeIcon from "../../assets/icons/light_mode.svg";
import { getIsDark, updateTheme } from "../../helpers/Utilities";

export default function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(getIsDark());

  const switchTheme = () => {
    setIsDark(!isDark);
    updateTheme(!isDark);
  };

  useEffect(() => {
    const isDark = getIsDark();
    updateTheme(isDark);
  }, []);

  return (
    <button
      className="group flex h-min items-center justify-center self-start rounded-full border-2 border-dark bg-white p-2 transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-white dark:bg-dark hover:dark:bg-white"
      onClick={switchTheme}
    >
      <img
        src={isDark ? DarkThemeIcon : LightThemeIcon}
        className="transition-all duration-[500] ease-in-out-quad group-hover:invert dark:invert group-hover:dark:invert-0 w-9"
        alt="theme icon"
      />
    </button>
  );
}
