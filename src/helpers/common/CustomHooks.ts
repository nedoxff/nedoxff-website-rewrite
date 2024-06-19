import { useGSAP } from "@gsap/react";
import { RefObject, useEffect, useRef } from "react";

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useAnimatable = <TRef extends HTMLElement, TTrigger>(
  trigger: TTrigger,
  callback: (
    prev: TTrigger | undefined,
    curr: TTrigger,
    ref: RefObject<TRef>,
  ) => void,
): RefObject<TRef> => {
  const ref = useRef<TRef>(null);
  const prev = usePrevious(trigger);
  useGSAP(() => callback(prev, trigger, ref), [trigger]);
  return ref;
};
