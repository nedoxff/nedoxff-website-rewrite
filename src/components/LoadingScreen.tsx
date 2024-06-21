import React, { useEffect, useRef, useState } from "react";
import { ProgressPromise } from "../helpers/ProgressPromise";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useStoreon } from "storeon/react";
import { AppEvents, AppState } from "../helpers/state";
import { getIsRedirect } from "../helpers/utilities";

export type LoadingScreenProps = {
  callbackDelay?: number;
  text?: string;
  execute: () => ProgressPromise<unknown>;
  onExecuted: () => void;
};

export default function LoadingScreen(props: LoadingScreenProps) {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const loadingBarRef = useRef<HTMLHeadingElement>(null);

  const { theme } = useStoreon<AppState, AppEvents>("theme");
  const darkColor = `rgb(${getComputedStyle(document.body).getPropertyValue("--color-dark")})`;

  useEffect(() => {
    props
      .execute()
      .progress((value) => setLoadingBarProgress(value))
      .catch((reason) => setErrorMessage(reason.toString()));
  }, []);

  useGSAP(() => {
    gsap.to(loadingBarRef.current, {
      scaleX: loadingBarProgress / 100,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        if (loadingBarProgress === 100)
          setTimeout(() => props.onExecuted(), props.callbackDelay ?? 0);
      },
    });
  }, [loadingBarProgress]);

  const backgroundColor = getIsRedirect()
    ? theme === "dark"
      ? darkColor
      : "white"
    : "white";
  const elementColor = getIsRedirect()
    ? theme === "dark"
      ? "white"
      : darkColor
    : darkColor;

  return (
    <div
      style={{
        backgroundColor: backgroundColor,
      }}
      className="fixed top-0 left-0 w-dvw h-dvh"
    >
      {errorMessage !== "" && (
        <h1
          style={{ color: elementColor }}
          className="font-title font-medium text-2xl p-5"
        >
          an error occurred while loading:
          <br />
          <span className="font-body font-normal">{errorMessage}</span>
        </h1>
      )}
      <h1
        ref={loadingBarRef}
        style={{
          backgroundColor: elementColor,
          transformOrigin: "center left",
        }}
        className="font-title scale-x-0 text-3xl xl:text-5xl fixed bottom-0 left-0 w-dvw text-transparent font-semibold"
      >
        {props.text ?? "loading"}
      </h1>
      <h1
        style={{
          color: backgroundColor,
          filter: elementColor === "white" ? "invert(1)" : "",
        }}
        className="mix-blend-difference font-title text-3xl xl:text-5xl fixed bottom-0 left-0 font-semibold"
      >
        {props.text ?? "loading"}
      </h1>
    </div>
  );
}
