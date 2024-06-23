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
import { LICENSING_INFORMATION, VERSION_INFORMATION } from "./InformationText";

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
        className="font-title text-5xl xl:text-6xl text-dark dark:text-white font-semibold"
      >
        nedoxff{" "}
        <span className="text-2xl xl:text-3xl font-medium">(he/him)</span>
      </AnimatableText>
      <AnimatableText
        show={show}
        showDelay={0.1}
        hideDelay={0.1}
        duration={1}
        safePadding={5}
        className="font-body text-3xl xl:text-4xl text-dark dark:text-white"
      >
        is a <span className="font-semibold">{isFurry ? "dog" : "guy"}</span>{" "}
        that likes creating things on the internet.
      </AnimatableText>
      <div className="xl:absolute xl:max-w-[60%] xl:bottom-0 xl:left-0 xl:p-5 flex flex-col gap-2 relative">
        <div
          className="hidden flex-row gap-1 -ml-1 mt-1 xl:ml-0 xl:mt-0"
          ref={buttonContainerRef}
        >
          <ThemeSwitcher />
          <IconButton
            icon={isFurry ? HumanIcon : PawIcon}
            onClicked={() => setIsFurry(!isFurry)}
          />
        </div>
        <div className="xl:block hidden">
          <AnimatableSplitText
            show={show}
            duration={1}
            safePadding={5}
            stagger={0.1}
            className="font-body text-xl text-dark dark:text-white"
          >
            {LICENSING_INFORMATION}
          </AnimatableSplitText>
          <AnimatableText
            show={show}
            duration={1}
            safePadding={5}
            showDelay={0.4}
            hideDelay={0.4}
            className="font-body text-lg font-light text-dark dark:text-white"
          >
            {VERSION_INFORMATION}
          </AnimatableText>
        </div>
      </div>

      <img
        ref={imageRef}
        className="hidden absolute bottom-0 right-0 origin-bottom-right dark:filter-white xl:scale-[40%] scale-[75%]"
        src={isFurry ? assets?.get("dog") : assets?.get("guy")}
      ></img>
    </div>
  );
}
