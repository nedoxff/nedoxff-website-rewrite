import { ReactNode } from "react";
import gsap from "gsap";
import { useAnimatable } from "../../helpers/common/CustomHooks";

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

export default function AnimatableText(props: AnimatableTextProps) {
  const paragraphRef = useAnimatable<HTMLParagraphElement, boolean>(
    props.show,
    (prev, curr, ref) => {
      if (prev === undefined)
        gsap.set(ref.current, { yPercent: 100 + (props.safePadding ?? 0) });

      if (prev == false && curr === true) {
        gsap.to(ref.current, {
          yPercent: 0,
          duration: props.duration ?? 1,
          ease: props.ease ?? "power3.inOut",
          delay: props.showDelay ?? 0,
        });
      } else if (prev === true && curr === false) {
        gsap.to(ref.current, {
          yPercent: -100 - (props.safePadding ?? 0),
          duration: props.duration ?? 1,
          ease: props.ease ?? "power3.inOut",
          delay: props.hideDelay ?? 0,
          onComplete: () => {
            gsap.set(ref.current, {
              yPercent: 100 + (props.safePadding ?? 0),
            });
          },
        });
      }
    },
  );

  return (
    <div className="overflow-hidden">
      <p ref={paragraphRef} className={props.className}>
        {props.children}
      </p>
    </div>
  );
}
