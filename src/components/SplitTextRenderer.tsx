import { ReactNode, useEffect, useRef, useState } from "react";
import SplitType, { SplitTypeOptions } from "split-type";

export type SplitTextRenderer = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  options?: Partial<SplitTypeOptions> | undefined;
  render: (element: HTMLElement, idx: number) => ReactNode;
};

export default function SplitTextRenderer(props: SplitTextRenderer) {
  const helperRef = useRef<HTMLParagraphElement>(null);
  const [split, setSplit] = useState<SplitType>();

  useEffect(() => {
    setSplit(SplitType.create(helperRef.current!, props.options));
  }, []);

  useEffect(() => {
    console.log(split);
  }, [split]);

  return split === undefined ? (
    <p
      ref={helperRef}
      className={props.className}
      style={{ visibility: "hidden", fontKerning: "none" }}
    >
      {props.children}
    </p>
  ) : (
    <div className={props.containerClassName}>
      {split?.chars?.map((el, idx) => props.render(el, idx))}
      {split?.words?.map((el, idx) => props.render(el, idx))}
      {split?.lines?.map((el, idx) => props.render(el, idx))}
    </div>
  );
}
