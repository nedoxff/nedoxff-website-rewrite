import { useStoreon } from "storeon/react";
import { AppEvents, AppState } from "../../helpers/state";
import { ProgressPromise } from "../../helpers/ProgressPromise";
import LoadingScreen from "../../components/LoadingScreen";
import { getIsRedirect } from "../../helpers/utilities";

export default function Art() {
  const load = () =>
    new ProgressPromise<void>((resolve, reject, progress) => {
      resolve();
      /* assetHandler
        .load()
        .progress((p) => progress((75 / 100) * p))
        .then(() => {
          if (document.readyState === "complete") resolve();
          else {
            document.onreadystatechange = () =>
              document.readyState === "complete" && resolve();
          }
        })
        .catch((err) => reject(err)); */
    });

  return (
    <main>
      <LoadingScreen
        callbackDelay={500}
        execute={load}
        text="loading (this will take a little longer)"
        onExecuted={() => console.log("yay")}
      />
    </main>
  );
}
