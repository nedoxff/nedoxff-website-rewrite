import { useContext } from "react";
import toast from "react-hot-toast";
import { AnimatableText } from "../../components/AnimatableComponents/AnimatableText";
import IconButton from "../../components/Buttons/IconButton";
import { useAnimatable } from "../../helpers/common/CustomHooks";
import { animateClipTransition } from "../../helpers/common/Transitions";
import { RedirectCallback, ThemeContext, ShowContext } from "./Home";
import DiscordIcon from "../../assets/socials/discord.svg";
import GithubIcon from "../../assets/socials/github.svg";
import MailIcon from "../../assets/socials/mail.svg";
import TwitterIcon from "../../assets/socials/twitter.svg";

export default function ContactsSection(props: { redirect: RedirectCallback }) {
  const theme = useContext(ThemeContext);
  const show = useContext(ShowContext);
  const buttonsContainerRef = useAnimatable<HTMLDivElement, boolean>(
    show,
    (prev, curr, ref) => {
      if (!prev && curr) {
        animateClipTransition({ axis: "y", duration: 1, display: "flex" }, ref);
      } else if (prev && !curr) {
        animateClipTransition<HTMLDivElement>(
          { axis: "y", display: "flex", backwards: true, duration: 1 },
          ref,
        );
      }
    },
  );

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(
      () => {
        toast.success("Copied to clipboard!", {
          id: "copied-to-clipboard",
          className:
            "font-body dark:bg-white dark:text-dark bg-dark text-white text-2xl font-medium",
        });
      },
      () => {
        toast.error("Failed to copy to clipboard!", {
          id: "copied-to-clipboard",
          className:
            "font-body dark:bg-white dark:text-dark bg-dark text-white text-2xl font-medium",
        });
      },
    );
  };

  return (
    <div className="overflow-clip rounded-xl flex flex-col p-5 row-start-4 col-span-1">
      <AnimatableText
        show={show}
        duration={1}
        safePadding={5}
        className="font-title text-4xl xl:text-5xl text-dark dark:text-white font-semibold"
      >
        contacts
      </AnimatableText>
      <AnimatableText
        show={show}
        showDelay={0.1}
        hideDelay={0.1}
        duration={1}
        safePadding={5}
        className="font-body text-3xl xl:text-4xl text-dark dark:text-white"
      >
        you can find me here:
      </AnimatableText>
      <div
        className="hidden flex-row gap-1 flex-grow items-center [&>*]:self-center"
        ref={buttonsContainerRef}
      >
        <IconButton
          className="copy-button"
          icon={DiscordIcon}
          onClicked={() => copyToClipboard("nedoxff")}
        ></IconButton>
        <IconButton
          icon={GithubIcon}
          onClicked={() =>
            props.redirect(
              "https://github.com/nedoxff",
              false,
              theme === "dark" ? "#22272e" : "#ffffff",
            )
          }
        ></IconButton>
        <IconButton
          className="copy-button"
          icon={MailIcon}
          onClicked={() => copyToClipboard("nedoxff@proton.me")}
        ></IconButton>
        <IconButton
          icon={TwitterIcon}
          onClicked={() =>
            props.redirect(
              "https://x.com/nedodraws",
              false,
              theme === "dark" ? "#000000" : "#ffffff",
            )
          }
        ></IconButton>
      </div>
    </div>
  );
}
