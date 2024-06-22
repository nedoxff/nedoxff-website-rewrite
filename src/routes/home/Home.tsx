import { RefObject, createContext, useContext, useState } from "react";
import { ProgressPromise } from "../../helpers/ProgressPromise";
import { animateClipTransition } from "../../helpers/common/Transitions";
import { useAnimatable } from "../../helpers/common/CustomHooks";
import { Toaster } from "react-hot-toast";
import gsap from "gsap";
import LoadingScreen from "../../components/LoadingScreen";
import {
  HistoryState,
  getIsRedirect,
  preloadImage,
} from "../../helpers/utilities";
import AssetHandler from "../../helpers/AssetHandler";

import { useStoreon } from "storeon/react";
import { AppEvents, AppState } from "../../helpers/state";
import IntroductionSection from "./IntroductionSection";
import ContactsSection from "./ContactsSection";
import ArtSection from "./ArtSection";
import CodeSection from "./CodeSection";
import { useNavigate } from "react-router-dom";
import MobileInformationSection from "./MobileInformationSection";

export type RedirectCallback = (
  url: string,
  internalRedirect?: boolean,
  color?: string,
) => void;

export const ShowContext = createContext(false);
export const AssetContext = createContext<AssetHandler | undefined>(undefined);
export const ThemeContext = createContext<string>("");

export default function Home() {
  const load = () =>
    new ProgressPromise<void>((resolve, reject, progress) => {
      assetHandler
        .load()
        .progress((p) => progress((75 / 100) * p))
        .then(() => {
          if (document.readyState === "complete") resolve();
          else {
            document.onreadystatechange = () =>
              document.readyState === "complete" && resolve();
          }
        })
        .catch((err) => reject(err));
    });

  const { theme } = useStoreon<AppState, AppEvents>("theme");
  const [showContent, setShowContent] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [assetHandler, _] = useState(
    new AssetHandler(
      import.meta.glob<string>("../../assets/home/*.*", {
        query: "?format=avif",
        import: "default",
        eager: true,
      }),
      preloadImage,
    ),
  );

  const backgroundRef = useAnimatable<HTMLDivElement, boolean>(
    showContent,
    (prev, curr, ref) => {
      if (!prev && curr) {
        gsap.to(ref.current, {
          scaleY: 1,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => setShowGrid(true),
        });
      }
    },
  );

  const navigate = useNavigate();
  const redirect = (
    url: string,
    internalRedirect?: boolean,
    color?: string,
  ) => {
    setShowGrid(false);
    if (color !== undefined) {
      gsap.to(backgroundRef.current, {
        backgroundColor: color,
        duration: 1,
        ease: "power3.inOut",
      });
    }
    setTimeout(() => {
      if (internalRedirect) {
        history.pushState(
          { isInternalRedirect: true } as HistoryState,
          "",
          url,
        );
        navigate(0);
      } else {
        window.location.href = url;
      }
    }, 1250);
  };

  return (
    <main>
      <ThemeContext.Provider value={theme}>
        <Toaster />

        <LoadingScreen
          callbackDelay={500}
          execute={load}
          onExecuted={() => setShowContent(true)}
        ></LoadingScreen>

        <div
          className="dark:bg-dark bg-white w-dvw h-dvh fixed top-0 left-0 origin-bottom scale-y-0"
          ref={backgroundRef}
        ></div>

        <AssetContext.Provider value={assetHandler}>
          <ShowContext.Provider value={showGrid}>
            <HomeGrid redirect={redirect} />
          </ShowContext.Provider>
        </AssetContext.Provider>
      </ThemeContext.Provider>
    </main>
  );
}

function HomeGrid(props: { redirect: RedirectCallback }) {
  const show = useContext(ShowContext);

  const commonAnimate = (
    prev: boolean | undefined,
    curr: boolean,
    ref: RefObject<HTMLDivElement>,
  ) => {
    if (!prev && curr) {
      animateClipTransition<HTMLDivElement>({ axis: "y", duration: 1 }, ref);
    } else if (prev && !curr) {
      animateClipTransition<HTMLDivElement>(
        { axis: "y", backwards: true, duration: 1 },
        ref,
      );
    }
  };

  const createCommonRef = () =>
    useAnimatable<HTMLDivElement, boolean>(show, commonAnimate);

  const introductionBorderRef = createCommonRef();
  const contactsBorderRef = createCommonRef();
  const artBorderRef = createCommonRef();
  const codeBorderRef = createCommonRef();

  return (
    <main>
      <div className="grid absolute gap-2 p-3 xl:p-10 w-dvw h-[200dvh] xl:h-dvh grid-cols-1 grid-rows-9 xl:grid-cols-2 xl:grid-rows-4">
        <div
          className="border-2 rounded-xl hidden border-dark dark:border-white row-start-1 row-end-4 col-span-1"
          ref={introductionBorderRef}
        ></div>
        <div
          className="border-2 rounded-xl border-dark dark:border-white row-start-4 col-span-1 hidden"
          ref={contactsBorderRef}
        ></div>
        <div
          className="border-2 rounded-xl border-dark dark:border-white row-span-2 xl:col-start-2 hidden"
          ref={artBorderRef}
        ></div>
        <div
          className="border-2 rounded-xl border-dark dark:border-white row-span-2 xl:col-start-2 hidden"
          ref={codeBorderRef}
        ></div>
      </div>

      <div className="grid absolute gap-2 p-3 xl:p-10 w-dvw h-[200dvh] xl:h-dvh grid-cols-1 grid-rows-9 xl:grid-cols-2 xl:grid-rows-4">
        <IntroductionSection />
        <ContactsSection redirect={props.redirect} />
        <ArtSection redirect={props.redirect} />
        <CodeSection redirect={props.redirect} />
        <MobileInformationSection />
      </div>
    </main>
  );
}
