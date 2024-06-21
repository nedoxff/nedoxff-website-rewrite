import { StoreonModule, StoreonStore, createStoreon } from "storeon";
import { getTheme, updateTheme } from "./utilities";

export interface AppState {
  theme: string;
}

export interface AppEvents {
  set: string;
}

const themeModule: StoreonModule<AppState, AppEvents> = (store) => {
  store.on("@init", () => {
    const theme = getTheme();
    updateTheme(theme);
    return { theme: theme };
  });
  store.on("set", (state, event) => {
    updateTheme(event);
    return { theme: event };
  });
};

export const store = createStoreon<AppState, AppEvents>([themeModule]);
