import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { ProgressPromise } from "../helpers/ProgressPromise";
import gsap from 'gsap';
import Animatable from "../components/AnimatableComponents/Animatable";
import AnimatableText from "../components/AnimatableComponents/AnimatableText";

export default function Home() {
    const load = () => new ProgressPromise<void>((resolve, reject, progress) => {
        resolve();
    })

    const [showContent, setShowContent] = useState(false);

    return <main>
        <LoadingScreen callbackDelay={250} backgroundColor="white" elementColor="#050505" execute={load} onExecuted={() => setShowContent(true)}></LoadingScreen>

        <Animatable<HTMLDivElement> show={showContent} animate={(prev, curr, ref) => {
            if (prev == false && curr === true) {
                gsap.to(ref.current, {
                    scaleY: 1,
                    duration: 1,
                    ease: 'power3.inOut'
                });
            }
        }} render={(ref) => <div className="bg-dark w-dvw h-dvh fixed top-0 left-0 origin-bottom scale-y-0" ref={ref}></div>} />
    </main>
}