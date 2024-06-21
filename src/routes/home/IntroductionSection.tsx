import { useState, useContext } from "react";
import {
  AnimatableText,
  AnimatableSplitText,
} from "../../components/AnimatableComponents/AnimatableText";
import IconButton from "../../components/Buttons/IconButton";
import ThemeSwitcher from "../../components/Buttons/ThemeSwitcher";
import { useAnimatable } from "../../helpers/common/CustomHooks";
import { animateClipTransition } from "../../helpers/common/Transitions";
import { AssetContext, ShowContext } from "./Home";
import PawIcon from "../../assets/icons/paw.svg";
import HumanIcon from "../../assets/icons/human.svg";

export default function IntroductionSection() {
  const [isFurry, setIsFurry] = useState(false);
  const show = useContext(ShowContext);
  const assets = useContext(AssetContext);

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
    <div className="overflow-clip rounded-xl flex flex-col p-5 row-start-1 row-end-4 col-span-1 relative">
      <AnimatableText
        show={show}
        duration={1}
        safePadding={5}
        className="font-title text-6xl text-dark dark:text-white font-semibold"
      >
        nedoxff <span className="text-3xl font-medium">(he/him)</span>
      </AnimatableText>
      <AnimatableText
        show={show}
        showDelay={0.1}
        hideDelay={0.1}
        duration={1}
        safePadding={5}
        className="font-body text-4xl text-dark dark:text-white"
      >
        is a <span className="font-semibold">{isFurry ? "dog" : "guy"}</span>{" "}
        that likes creating things on the internet.
      </AnimatableText>
      <div className="absolute max-w-[60%] bottom-0 left-0 p-5 flex flex-col gap-2">
        <div className="hidden flex-row gap-1" ref={buttonContainerRef}>
          <ThemeSwitcher />
          <IconButton
            icon={isFurry ? HumanIcon : PawIcon}
            onClicked={() => setIsFurry(!isFurry)}
          />
        </div>
        <AnimatableSplitText
          show={show}
          duration={1}
          safePadding={5}
          stagger={0.1}
          className="font-body text-xl text-dark dark:text-white"
        >
          this website uses Clash Grotesk and Clash Display fonts, which are
          licensed under the ITF FFL.
          <br />
          the code for this website is open-source and can be found on github.
          <br />
        </AnimatableSplitText>
        <AnimatableText
          show={show}
          duration={1}
          safePadding={5}
          showDelay={0.4}
          hideDelay={0.4}
          className="font-body text-lg font-light text-dark dark:text-white"
        >
          version {__VERSION_NAME__} • {__LAST_COMMIT_HASH__}
        </AnimatableText>
      </div>

      <img
        ref={imageRef}
        className="hidden absolute bottom-0 right-0 dark:filter-white w-[40%]"
        src={isFurry ? assets?.get("dog") : assets?.get("guy")}
      ></img>
    </div>
  );
}
