export const preloadImage = (src: string) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.src = src;
  });

export const getIsDark = (): boolean => {
  if (localStorage.getItem("theme") !== null)
    return localStorage.getItem("theme") === "dark";
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

export const updateTheme = (newIsDark: boolean) => {
  if (newIsDark) document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", newIsDark ? "dark" : "light");
};
