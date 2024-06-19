import { RefObject } from "react";
import gsap from "gsap";

export type ClipTransitionParams = {
  axis: "x" | "y";
  reverse?: boolean;
  delay?: number;
  duration?: number;
  ease?: string;
  backwards?: boolean;
  callback?: () => void;
  display?: string;
};

export function animateClipTransition<T extends HTMLElement>(
  params: ClipTransitionParams,
  ref: RefObject<T>,
) {
  const a = params.axis;
  const r = params.reverse ?? false;
  const b = params.backwards ?? false;

  const start = `inset(${a === "y" && r ? "100%" : "0%"} ${a === "x" && !r ? "100%" : "0%"} ${a === "y" && !r ? "100%" : "0%"} ${a === "x" && r ? "100%" : "0%"})`;
  const end = `inset(0% 0% 0% 0%)`;

  gsap.set(ref.current, {
    clipPath: b ? end : start,
    display: params.display ?? "block",
  });

  gsap.fromTo(
    ref.current,
    { clipPath: b ? end : start },
    {
      clipPath: b ? start : end,
      duration: params.duration ?? 1.5,
      ease: params.ease ?? "power3.inOut",
      delay: params.delay ?? 0,
      onComplete: () => {
        params.callback?.();
      },
    },
  );
}
