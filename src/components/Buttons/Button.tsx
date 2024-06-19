import { ReactNode, RefObject } from "react";

export type ButtonProps = {
  onClick?: () => void;
  className?: string;
  innerRef?: RefObject<HTMLButtonElement>;
  children: ReactNode;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      ref={props.innerRef}
      className={`${props.className} group flex h-min items-center justify-center self-start rounded-full border-2 text-dark dark:text-white border-dark bg-white p-3 transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-white dark:bg-dark hover:dark:bg-white hover:dark:text-dark hover:text-white`}
      onClick={() => props.onClick?.()}
    >
      {props.children}
    </button>
  );
}
