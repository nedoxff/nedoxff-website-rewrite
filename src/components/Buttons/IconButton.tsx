export type IconButtonProps = {
  onClicked: () => void;
  icon: string;
  className?: string;
};

export default function IconButton(props: IconButtonProps) {
  return (
    <button
      className={`${props.className} group flex h-min aspect-square items-center justify-center self-start rounded-full border-2 border-dark bg-white p-2 transition-all duration-[500] ease-in-out-quad hover:bg-dark dark:border-white dark:bg-dark hover:dark:bg-white`}
      onClick={() => props.onClicked()}
    >
      <img
        src={props.icon}
        className="transition-all duration-[500] ease-in-out-quad group-hover:invert dark:invert group-hover:dark:invert-0 w-9"
        alt="icon switch"
      />
    </button>
  );
}
