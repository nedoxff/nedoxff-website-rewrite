export type IconSwitchButtonProps = {
    onSwitched: () => void;
    icon: string;
}

export default function IconSwitchButton(props: IconSwitchButtonProps) {
    return <button
        className="group flex h-min items-center justify-center self-start rounded-full border-2 border-dark bg-white p-2 transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-white dark:bg-dark hover:dark:bg-white"
        onClick={() => props.onSwitched()}
    >
        <img
            src={props.icon}
            className="transition-all duration-[500] ease-in-out-quad group-hover:invert dark:invert group-hover:dark:invert-0 w-9"
            alt="icon switch"
        />
    </button>
}