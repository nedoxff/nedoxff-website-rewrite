import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { useAnimatable } from "../../helpers/common/CustomHooks";
import { useGSAP } from "@gsap/react";
import SplitTextRenderer from "../SplitTextRenderer";

export type AnimatableTextProps = {
  show: boolean;
  className: string;
  duration?: number;
  ease?: gsap.EaseString;
  showDelay?: number;
  hideDelay?: number;
  children?: ReactNode;
  safePadding?: number;
};

export function AnimatableSplitText(
  props: AnimatableTextProps & { stagger?: number },
) {
  return (
    <SplitTextRenderer
      children={props.children}
      className={props.className}
      containerClassName="flex flex-col"
      options={{ split: "lines" }}
      render={(el, idx) => (
        <AnimatableText
          key={idx}
          showDelay={(props.stagger ?? 0) * idx}
          hideDelay={(props.stagger ?? 0) * idx}
          {...props}
        >
          {el.innerText}
        </AnimatableText>
      )}
    />
  );
}

export function AnimatableText(props: AnimatableTextProps) {
  const paragraphRef = useAnimatable<HTMLParagraphElement, boolean>(
    props.show,
    (prev, curr, ref) => {
      if (!prev && curr) {
        gsap.fromTo(
          ref.current,
          {
            yPercent: 100 + (props.safePadding ?? 0),
          },
          {
            yPercent: 0,
            duration: props.duration ?? 1,
            ease: props.ease ?? "power3.inOut",
            delay: props.showDelay ?? 0,
          },
        );
      } else if (prev && !curr) {
        gsap.fromTo(
          ref.current,
          {
            yPercent: 0,
          },
          {
            yPercent: -100 - (props.safePadding ?? 0),
            duration: props.duration ?? 1,
            ease: props.ease ?? "power3.inOut",
            delay: props.hideDelay ?? 0,
          },
        );
      }
    },
  );

  useGSAP(() => {
    // hide by default
    gsap.set(paragraphRef.current, {
      yPercent: 100 + (props.safePadding ?? 0),
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <p ref={paragraphRef} className={props.className}>
        {props.children}
      </p>
    </div>
  );
}
