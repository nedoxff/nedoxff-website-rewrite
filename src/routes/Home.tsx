import { RefObject, createContext, useContext, useState } from "react";
import { ProgressPromise } from "../helpers/ProgressPromise";
import { animateClipTransition } from "../helpers/common/Transitions";
import { useAnimatable } from "../helpers/common/CustomHooks";
import toast, { Toaster } from "react-hot-toast";
import AnimatableText from "../components/AnimatableComponents/AnimatableText";
import gsap from "gsap";
import LoadingScreen from "../components/LoadingScreen";
import {
  HistoryState,
  getIsDark,
  getIsRedirect,
  preloadImage,
} from "../helpers/Utilities";
import ThemeSwitcher from "../components/Buttons/ThemeSwitcher";
import IconButton from "../components/Buttons/IconButton";
import Button from "../components/Buttons/Button";

import Dog from "../assets/dog.png?format=avif&imagetools";
import Guy from "../assets/guy.png?format=avif&imagetools";
import PawIcon from "../assets/icons/paw.svg";
import HumanIcon from "../assets/icons/human.svg";
import DiscordIcon from "../assets/socials/discord.svg";
import GithubIcon from "../assets/socials/github.svg";
import MailIcon from "../assets/socials/mail.svg";
import TwitterIcon from "../assets/socials/twitter.svg";

type RedirectCallback = (
  url: string,
  internalRedirect?: boolean,
  color?: string,
) => void;
const ShowContext = createContext(false);

export default function Home() {
  const load = () =>
    new ProgressPromise<void>((resolve, reject, progress) => {
      const max = 75;
      const preload = [Dog, Guy];
      const perform = (idx: number) =>
        preloadImage(preload[idx])
          .then(() => {
            progress((max / preload.length) * (idx + 1));
            idx++;
            if (idx < preload.length - 1) perform(idx);
            else {
              if (document.readyState === "complete") resolve();
              else {
                document.onreadystatechange = () =>
                  document.readyState === "complete" && resolve();
              }
            }
          })
          .catch((err) => reject(err));
      perform(0);
    });

  const [showContent, setShowContent] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

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
      } else {
        window.location.href = url;
      }
    }, 1250);
  };

  const darkColor = `rgb(${getComputedStyle(document.body).getPropertyValue("--color-dark")})`;
  return (
    <main>
      <Toaster />

      <LoadingScreen
        callbackDelay={500}
        backgroundColor={
          getIsRedirect() ? (getIsDark() ? darkColor : "white") : "white"
        }
        elementColor={
          getIsRedirect() ? (getIsDark() ? "white" : darkColor) : darkColor
        }
        execute={load}
        onExecuted={() => setShowContent(true)}
      ></LoadingScreen>

      <div
        className="dark:bg-dark bg-white w-dvw h-dvh fixed top-0 left-0 origin-bottom scale-y-0"
        ref={backgroundRef}
      ></div>

      <ShowContext.Provider value={showGrid}>
        <HomeGrid redirect={redirect} />
      </ShowContext.Provider>
    </main>
  );
}

function HomeGrid(props: { redirect: RedirectCallback }) {
  const commonAnimate = (
    prev: boolean | undefined,
    curr: boolean,
    ref: RefObject<HTMLDivElement>,
  ) => {
    if (!prev && curr) {
      animateClipTransition<HTMLDivElement>({ axis: "y", duration: 0.75 }, ref);
    } else if (prev && !curr) {
      animateClipTransition<HTMLDivElement>(
        { axis: "y", backwards: true, duration: 0.75 },
        ref,
      );
    }
  };

  const show = useContext(ShowContext);

  const createCommonRef = () =>
    useAnimatable<HTMLDivElement, boolean>(show, commonAnimate);

  const introductionBorderRef = createCommonRef();
  const contactsBorderRef = createCommonRef();
  const artBorderRef = createCommonRef();
  const codeBorderRef = createCommonRef();

  return (
    <main>
      <div className="grid absolute gap-2 p-10 w-dvw h-dvh grid-cols-2 grid-rows-4">
        <div
          className="border-2 rounded-xl hidden border-white row-start-1 row-end-4 col-span-1"
          ref={introductionBorderRef}
        ></div>
        <div
          className="border-2 rounded-xl border-white row-start-4 col-span-1 hidden"
          ref={contactsBorderRef}
        ></div>
        <div
          className="border-2 rounded-xl border-white row-span-2 col-start-2 hidden"
          ref={artBorderRef}
        ></div>
        <div
          className="border-2 rounded-xl border-white row-span-2 col-start-2 hidden"
          ref={codeBorderRef}
        ></div>
      </div>
      <div className="grid absolute gap-2 p-10 w-dvw h-dvh grid-cols-2 grid-rows-4 z-10">
        <IntroductionSection />
        <ContactsSection redirect={props.redirect} />
        <ArtSection redirect={props.redirect} />
        <CodeSection redirect={props.redirect} />
      </div>
    </main>
  );
}

function IntroductionSection() {
  const [isFurry, setIsFurry] = useState(false);
  const show = useContext(ShowContext);

  const buttonContainerRef = useAnimatable<HTMLDivElement, boolean>(
    show,
    (prev, curr, ref) => {
      if (!prev && curr) {
        animateClipTransition({ axis: "y", duration: 1, display: "flex" }, ref);
      } else if (prev && !curr) {
        animateClipTransition<HTMLDivElement>(
          { axis: "y", display: "flex", backwards: true, duration: 1 },
          ref,
        );
      }
    },
  );
  const imageRef = useAnimatable<HTMLImageElement, boolean>(
    show,
    (prev, curr, ref) => {
      if (!prev && curr) {
        animateClipTransition({ axis: "y", duration: 1 }, ref);
      } else if (prev && !curr) {
        animateClipTransition<HTMLDivElement>(
          { axis: "y", backwards: true, duration: 1 },
          ref,
        );
      }
    },
  );

  return (
    <div className="overflow-clip rounded-xl flex flex-col p-5 border-white row-start-1 row-end-4 col-span-1 relative">
      <AnimatableText
        show={show}
        duration={1}
        safePadding={5}
        className="font-title text-6xl text-white font-semibold"
      >
        nedoxff <span className="text-3xl font-medium">(he/him)</span>
      </AnimatableText>
      <AnimatableText
        show={show}
        duration={1}
        safePadding={5}
        className="font-body text-4xl text-white"
      >
        is a <span className="font-semibold">{isFurry ? "dog" : "guy"}</span>{" "}
        that likes creating things on the internet.
      </AnimatableText>
      <div className="absolute bottom-0 left-0 p-5 flex flex-col gap-2">
        <div className="hidden flex-row gap-1" ref={buttonContainerRef}>
          <ThemeSwitcher />
          <IconButton
            icon={isFurry ? HumanIcon : PawIcon}
            onClicked={() => setIsFurry(!isFurry)}
          />
        </div>
        <AnimatableText
          show={show}
          duration={1}
          safePadding={5}
          className="font-body text-xl text-white max-w-[60%]"
        >
          this website uses Clash Grotesk and Clash Display fonts, which are
          licensed under the ITF FFL.
          <br />
          the code for this website is open-source and can be found on github.
        </AnimatableText>
      </div>

      <img
        ref={imageRef}
        className="hidden absolute bottom-0 right-0 filter-white w-[40%]"
        src={isFurry ? Dog : Guy}
      ></img>
    </div>
  );
}

function ContactsSection(props: { redirect: RedirectCallback }) {
  const show = useContext(ShowContext);
  const buttonsContainerRef = useAnimatable<HTMLDivElement, boolean>(
    show,
    (prev, curr, ref) => {
      if (!prev && curr) {
        animateClipTransition({ axis: "y", duration: 1, display: "flex" }, ref);
      } else if (prev && !curr) {
        animateClipTransition<HTMLDivElement>(
          { axis: "y", display: "flex", backwards: true, duration: 1 },
          ref,
        );
      }
    },
  );

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(
      () => {
        toast.success("Copied to clipboard!", {
          id: "copied-to-clipboard",
          className:
            "font-body dark:bg-white dark:text-dark bg-dark text-white text-xl font-medium",
        });
      },
      () => {
        toast.error("Failed to copy to clipboard!", {
          id: "copied-to-clipboard",
          className:
            "font-body dark:bg-white dark:text-dark bg-dark text-white text-xl font-medium",
        });
      },
    );
  };

  return (
    <div className="overflow-clip rounded-xl flex flex-col p-5 row-start-4 col-span-1">
      <AnimatableText
        show={show}
        duration={1}
        safePadding={5}
        className="font-title text-5xl text-white font-semibold"
      >
        contacts
      </AnimatableText>
      <AnimatableText
        show={show}
        duration={1}
        safePadding={5}
        className="font-body text-4xl text-white"
      >
        you can find me on the following platforms:
      </AnimatableText>
      <div
        className="hidden flex-row gap-1 flex-grow items-center [&>*]:self-center"
        ref={buttonsContainerRef}
      >
        <IconButton
          className="copy-button"
          icon={DiscordIcon}
          onClicked={() => copyToClipboard("nedoxff")}
        ></IconButton>
        <IconButton
          icon={GithubIcon}
          onClicked={() =>
            props.redirect(
              "https://github.com/nedoxff",
              false,
              getIsDark() ? "#22272e" : "#ffffff",
            )
          }
        ></IconButton>
        <IconButton
          className="copy-button"
          icon={MailIcon}
          onClicked={() => copyToClipboard("nedoxff@proton.me")}
        ></IconButton>
        <IconButton
          icon={TwitterIcon}
          onClicked={() =>
            props.redirect(
              "https://x.com/nedodraws",
              false,
              getIsDark() ? "#000000" : "#ffffff",
            )
          }
        ></IconButton>
      </div>
    </div>
  );
}

function ArtSection(props: { redirect: RedirectCallback }) {
  const show = useContext(ShowContext);

  const redirectButtonRef = useAnimatable<HTMLDivElement, boolean>(
    show,
    (prev, curr, ref) => {
      if (!prev && curr) {
        animateClipTransition({ axis: "y", duration: 1 }, ref);
      } else if (prev && !curr) {
        animateClipTransition<HTMLDivElement>(
          { axis: "y", backwards: true, duration: 1 },
          ref,
        );
      }
    },
  );

  return (
    <div className="rounded-xl flex flex-col p-5 border-white row-span-2 col-start-2 relative">
      <AnimatableText
        show={show}
        duration={1}
        safePadding={5}
        className="font-title text-5xl text-white font-semibold"
      >
        art
      </AnimatableText>
      <div
        className="hidden absolute right-0 bottom-0 mr-5 mb-5"
        ref={redirectButtonRef}
      >
        <Button
          className="font-body text-2xl"
          onClick={() => props.redirect("#art", true)}
        >
          view work
        </Button>
      </div>
    </div>
  );
}

function CodeSection(props: { redirect: RedirectCallback }) {
  const show = useContext(ShowContext);

  const redirectButtonRef = useAnimatable<HTMLDivElement, boolean>(
    show,
    (prev, curr, ref) => {
      if (!prev && curr) {
        animateClipTransition({ axis: "y", duration: 1 }, ref);
      } else if (prev && !curr) {
        animateClipTransition<HTMLDivElement>(
          { axis: "y", backwards: true, duration: 1 },
          ref,
        );
      }
    },
  );

  return (
    <div className="rounded-xl row-span-2 col-start-2 flex flex-col p-5 relative">
      <AnimatableText
        show={show}
        duration={1}
        safePadding={5}
        className="font-title text-5xl text-white font-semibold"
      >
        code
      </AnimatableText>
      <div
        className="hidden absolute right-0 bottom-0 mr-5 mb-5"
        ref={redirectButtonRef}
      >
        <Button
          className="font-body text-2xl"
          onClick={() => props.redirect("#code", true)}
        >
          view work
        </Button>
      </div>
    </div>
  );
}
