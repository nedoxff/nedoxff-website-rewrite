export const preloadImage = (src: string) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.src = src;
  });

// this should only be used for initialization and inital page load!
export const getTheme = (): string => {
  if (localStorage.getItem("theme") !== null)
    return localStorage.getItem("theme")!;
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const updateTheme = (theme: string) => {
  if (theme === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", theme);
};

export type HistoryState = {
  isInternalRedirect: boolean;
};

export const getIsRedirect = (): boolean =>
  ((history.state as HistoryState) ?? { isInternalRedirect: false })
    .isInternalRedirect;
