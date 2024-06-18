import { useGSAP } from "@gsap/react";
import { RefObject, useRef } from "react";
import { usePrevious } from "../../helpers/common/CustomHooks";

export type AnimatableProps<T> = {
    show: boolean;
    animate: (prev: boolean | undefined, current: boolean, ref: RefObject<T>) => void;
    render: (ref: RefObject<T>) => React.ReactNode;
};

export default function Animatable<T>(props: AnimatableProps<T>) {
    const previousShow = usePrevious(props.show);
    const ref = useRef<T>(null);
    useGSAP(() => props.animate(previousShow, props.show, ref), [props.show]);

    return props.render(ref);
}