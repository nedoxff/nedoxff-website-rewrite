import { ReactNode, RefObject, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { ProgressPromise } from "../helpers/ProgressPromise";
import gsap from "gsap";
import { animateClipTransition } from "../helpers/common/Transitions";
import AnimatableText from "../components/AnimatableComponents/AnimatableText";
import { preloadImage } from "../helpers/Utilities";

import Dog from "../assets/dog.png?format=avif&imagetools";
import Guy from "../assets/guy.png?format=avif&imagetools";
import ThemeSwitcher from "../components/Buttons/ThemeSwitcher";
import IconSwitchButton from "../components/Buttons/IconSwitchButton";
import PawIcon from "../assets/icons/paw.svg";
import HumanIcon from "../assets/icons/human.svg";
import Button from "../components/Buttons/Button";
import { useAnimatable } from "../helpers/common/CustomHooks";

export default function Home() {
  const load = () =>
    new ProgressPromise<void>((resolve, reject, progress) => {
      const max = 75;
      const preload = [Dog, Guy, PawIcon, HumanIcon];
      const perform = (idx: number) =>
        preloadImage(preload[idx]).then(() => {
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
        });
      perform(0);
    });

  const [showContent, setShowContent] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const backgroundRef = useAnimatable<HTMLDivElement, boolean>(
    showContent,
    (prev, curr, ref) => {
      if (prev === false && curr === true) {
        gsap.to(ref.current, {
          scaleY: 1,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => setShowGrid(true),
        });
      }
    },
  );

  return (
    <main>
      <LoadingScreen
        callbackDelay={500}
        backgroundColor="white"
        elementColor="#050505"
        execute={load}
        onExecuted={() => setShowContent(true)}
      ></LoadingScreen>

      <div
        className="bg-dark w-dvw h-dvh fixed top-0 left-0 origin-bottom scale-y-0"
        ref={backgroundRef}
      ></div>

      <HomeGrid show={showGrid} axis="y" duration={0.75} />
    </main>
  );
}

function HomeGrid(props: { show: boolean; axis: "x" | "y"; duration: number }) {
  const commonAnimate = (
    prev: boolean | undefined,
    curr: boolean,
    ref: RefObject<HTMLDivElement>,
  ) => {
    if (prev === false && curr === true) {
      animateClipTransition<HTMLDivElement>(
        { axis: props.axis, duration: props.duration },
        ref,
      );
    }
  };

  const createCommonRef = () =>
    useAnimatable<HTMLDivElement, boolean>(props.show, commonAnimate);

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
        <IntroductionSection show={props.show} />
        <ContactsSection show={props.show} />
        <ArtSection show={props.show} />
        <CodeSection show={props.show} />
      </div>
    </main>
  );
}

function IntroductionSection(props: { show: boolean }) {
  const [isFurry, setIsFurry] = useState(false);
  const buttonContainerRef = useAnimatable<HTMLDivElement, boolean>(
    props.show,
    (prev, curr, ref) => {
      if (prev === false && curr === true) {
        animateClipTransition({ axis: "y", duration: 1, display: "flex" }, ref);
      }
    },
  );
  const imageRef = useAnimatable<HTMLImageElement, boolean>(
    props.show,
    (prev, curr, ref) => {
      if (prev === false && curr === true) {
        animateClipTransition({ axis: "y", duration: 1 }, ref);
      }
    },
  );

  return (
    <div className="overflow-clip rounded-xl flex flex-col p-5 border-white row-start-1 row-end-4 col-span-1 relative">
      <AnimatableText
        show={props.show}
        duration={1}
        safePadding={5}
        className="font-title text-6xl text-white font-semibold"
      >
        nedoxff <span className="text-3xl font-medium">(he/him)</span>
      </AnimatableText>
      <AnimatableText
        show={props.show}
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
          <IconSwitchButton
            icon={isFurry ? HumanIcon : PawIcon}
            onSwitched={() => setIsFurry(!isFurry)}
          />
        </div>
        <AnimatableText
          show={props.show}
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

function ContactsSection(props: { show: boolean }) {
  return (
    <div className="overflow-clip rounded-xl flex flex-col p-5 row-start-4 col-span-1">
      <AnimatableText
        show={props.show}
        duration={1}
        safePadding={5}
        className="font-title text-5xl text-white font-semibold"
      >
        contacts
      </AnimatableText>
      <AnimatableText
        show={props.show}
        duration={1}
        safePadding={5}
        className="font-body text-4xl text-white"
      >
        you can find me on the following platforms:
      </AnimatableText>
    </div>
  );
}

function ArtSection(props: { show: boolean }) {
  const redirectButtonRef = useAnimatable<HTMLDivElement, boolean>(
    props.show,
    (prev, curr, ref) => {
      if (prev === false && curr === true) {
        animateClipTransition({ axis: "y", duration: 1 }, ref);
      }
    },
  );

  return (
    <div className="rounded-xl flex flex-col p-5 border-white row-span-2 col-start-2 relative">
      <AnimatableText
        show={props.show}
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
          onClick={() => console.log("art")}
        >
          view work
        </Button>
      </div>
    </div>
  );
}

function CodeSection(props: { show: boolean }) {
  const redirectButtonRef = useAnimatable<HTMLDivElement, boolean>(
    props.show,
    (prev, curr, ref) => {
      if (prev === false && curr === true) {
        animateClipTransition({ axis: "y", duration: 1 }, ref);
      }
    },
  );

  return (
    <div className="rounded-xl row-span-2 col-start-2 flex flex-col p-5 relative">
      <AnimatableText
        show={props.show}
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
          onClick={() => console.log("code")}
        >
          view work
        </Button>
      </div>
    </div>
  );
}
