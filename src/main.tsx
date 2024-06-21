import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./routes/home/Home";
import "./index.css";
import { StoreContext } from "storeon/react";
import { store } from "./helpers/state";
import Art from "./routes/art/Art";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/art",
    element: <Art />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>,
);
