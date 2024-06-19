import { useEffect, useRef, useState } from "react";
import { ProgressPromise } from "../helpers/ProgressPromise";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

export type LoadingScreenProps = {
    backgroundColor: string;
    elementColor: string;
    callbackDelay?: number;
    execute: () => ProgressPromise<unknown>;
    onExecuted: () => void;
}

export default function LoadingScreen(props: LoadingScreenProps) {
    const [loadingBarProgress, setLoadingBarProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const loadingBarRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        props.execute()
        .progress(value => setLoadingBarProgress(value))
        .catch(reason => setErrorMessage(reason.toString()));        
    }, []);
    

    useGSAP(() => {
        gsap.to(loadingBarRef.current, {
            scaleX: loadingBarProgress / 100,
            duration: 0.5,
            ease: 'power3.inOut',
            onComplete: () => {
                if(loadingBarProgress === 100) setTimeout(() => props.onExecuted(), props.callbackDelay ?? 0);
            }
        });
    }, [loadingBarProgress]);

    return <div style={{backgroundColor: props.backgroundColor}} className="fixed top-0 left-0 w-dvw h-dvh">
        {errorMessage !== "" && <h1 style={{color: props.elementColor}} className="font-title font-medium text-2xl p-5">an error occurred while loading:<br/><span className="font-body font-normal">{errorMessage}</span></h1>}
        <h1 ref={loadingBarRef} style={{backgroundColor: props.elementColor, transformOrigin: "center left"}} className="font-title font-very-wide p-1 scale-x-0 text-2xl xl:text-4xl fixed bottom-0 left-0 w-dvw text-transparent">loading</h1>
        <h1 style={{color: props.backgroundColor}} className="mix-blend-lighten font-title text-2xl xl:text-4xl fixed bottom-0 left-0 font-very-wide">loading</h1>
    </div>
}