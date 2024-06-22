import { useContext } from "react";
import {
  AnimatableText,
  AnimatableSplitText,
} from "../../components/AnimatableComponents/AnimatableText";
import Button from "../../components/Buttons/Button";
import { useAnimatable } from "../../helpers/common/CustomHooks";
import { animateClipTransition } from "../../helpers/common/Transitions";
import {
  RedirectCallback,
  ThemeContext,
  ShowContext,
  AssetContext,
} from "./Home";

export default function ArtSection(props: { redirect: RedirectCallback }) {
  const theme = useContext(ThemeContext);
  const show = useContext(ShowContext);
  const assets = useContext(AssetContext);

  const backgroundImageRef = useAnimatable<HTMLImageElement, boolean>(
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
    <div className="rounded-xl overflow-clip flex flex-col p-5 row-span-2 xl:col-start-2 relative">
      <img
        src={assets?.get(`art-${theme}`)}
        ref={backgroundImageRef}
        className="hidden absolute top-0 left-0 w-full h-full object-cover object-right-bottom opacity-20"
      ></img>

      <AnimatableText
        show={show}
        duration={1}
        safePadding={5}
        className="font-title text-4xl xl:text-5xl text-dark dark:text-white font-semibold"
      >
        art
      </AnimatableText>
      <AnimatableSplitText
        show={show}
        duration={1}
        safePadding={5}
        stagger={0.1}
        className="font-body text-3xl xl:text-4xl text-dark dark:text-white"
      >
        i draw silly things, design posters, and occasionally write stuff.
        amateur typography enthusiast and pretty UI enjoyer.
      </AnimatableSplitText>
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
