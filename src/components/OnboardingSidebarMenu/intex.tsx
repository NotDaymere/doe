import clsx from "clsx";
import { useCursor } from "src/contexts/CursorContext";
import { ChatMenu } from "../ChatMenu";
import { CorporasMenu } from "../CorporasMenu";
import { FavouritesMenu } from "../FavouritesMenu";
import { ReactComponent as MinusIcon } from "src/assets/icons/minus.svg";
import { ReactComponent as PlusIcon } from "src/assets/icons/plus.svg";
import { TagsMenu } from "../TagsMenu";
import css from "./OnboardingSidebarMenu.module.less";

const menuItems = [
    {
        icon: "/img/icons/corpora3.svg",
        label: "Corpora",
        dataStep: "corpora",
        buttonTypeOpen: "corpora",
        buttonTypeClose: "corporaClose",
        triggerStep: 13,
    },
    {
        icon: "/img/icons/chats3.svg",
        label: "Individual Chats",
        dataStep: "chats",
        buttonTypeOpen: "chats",
        buttonTypeClose: "chatsClose",
        triggerStep: 14,
    },
    {
        icon: "/img/icons/star3.svg",
        label: "Favourites",
        dataStep: "favourites",
        buttonTypeOpen: "favourites",
        buttonTypeClose: "favouritesClose",
        triggerStep: 15,
    },
    {
        icon: "/img/icons/tags3.svg",
        label: "Tags",
        dataStep: "tags",
        buttonTypeOpen: "tags",
        buttonTypeClose: "tagsClose",
        triggerStep: 16,
    },
];

interface OnboardingSidebarMenuProps {
    step?: number;
    isOpen: boolean;
    handleUserClickedSidebarButton: (type: string) => void;
}

export const OnboardingSidebarMenu = ({
    step,
    isOpen,
    handleUserClickedSidebarButton,
}: OnboardingSidebarMenuProps) => {
    const { cursorMoving } = useCursor();
    return (
        <div className={clsx(css.sidebar_controls_subgroup, { [css.open]: isOpen })}>
            <div className={css.sidebar_controls_title}>Menu</div>
            <div className={css.sidebar_controls_group}>
                {menuItems.map(
                    ({ icon, label, triggerStep, dataStep, buttonTypeOpen, buttonTypeClose }) => (
                        <>
                            <button
                                key={`${label}-${triggerStep}`}
                                className={clsx(css.sidebar_controls_item, css.border, {
                                    [css.open_item]: isOpen,
                                    [css.highlighted_item]: step === triggerStep && !cursorMoving,
                                })}
                                data-step={dataStep}
                            >
                                <div className={css.sidebar_controls_head}>
                                    <img src={icon} alt={`${label} icon`} />
                                    <div className={css.sidebar_controls_text}>{label}</div>
                                </div>
                                {isOpen && (
                                    <>
                                        {step !== triggerStep || cursorMoving ? (
                                            <button
                                                className={clsx(css.plus, {
                                                    [css.fade]: step === 12,
                                                    [css.pop]: step && step >= 13,
                                                })}
                                                onClick={() => {
                                                    handleUserClickedSidebarButton(buttonTypeOpen);
                                                }}
                                            >
                                                <PlusIcon />
                                            </button>
                                        ) : (
                                            <button
                                                className={css.minus}
                                                onClick={() => {
                                                    handleUserClickedSidebarButton(buttonTypeClose);
                                                }}
                                            >
                                                <MinusIcon />
                                            </button>
                                        )}
                                    </>
                                )}
                            </button>
                            {label === "Corpora" && (
                                <CorporasMenu
                                    step={step}
                                    triggerStep={triggerStep}
                                    isOpen={isOpen}
                                    label={label}
                                />
                            )}
                            {label === "Individual Chats" && (
                                <ChatMenu
                                    step={step}
                                    triggerStep={triggerStep}
                                    isOpen={isOpen}
                                    label={label}
                                />
                            )}
                            {label === "Favourites" && (
                                <FavouritesMenu
                                    step={step}
                                    triggerStep={triggerStep}
                                    isOpen={isOpen}
                                    label={label}
                                />
                            )}
                            {label === "Tags" && (
                                <TagsMenu
                                    step={step}
                                    triggerStep={triggerStep}
                                    isOpen={isOpen}
                                    label={label}
                                />
                            )}
                        </>
                    )
                )}
            </div>
        </div>
    );
};
