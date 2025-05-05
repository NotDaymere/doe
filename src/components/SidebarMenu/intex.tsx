import clsx from "clsx";
import { useCursor } from "src/contexts/CursorContext";
import { SidebarItem } from "../SidebarItem";
import css from "./SidebarMenu.module.less";

const menuItems = [
    {
        icon: "/img/icons/corpora.svg",
        label: "Corpora",
        dataStep: "corpora",
        triggerStep: 13,
    },
    {
        icon: "/img/icons/chats.svg",
        label: "Individual Chats",
        dataStep: "chats",
        triggerStep: 14,
    },
    {
        icon: "/img/icons/star.svg",
        label: "Favourites",
        dataStep: "favourites",
        triggerStep: 15,
    },
    {
        icon: "/img/icons/tags.svg",
        label: "Tags",
        dataStep: "tags",
        triggerStep: 16,
    },
];

interface SidebarMenuProps {
    step?: number;
    isOpen: boolean;
}

export const SidebarMenu = ({ step, isOpen }: SidebarMenuProps) => {
    const { cursorMoving } = useCursor();
    return (
        <div className={clsx(css.sidebar_controls_subgroup, { [css.open]: isOpen })}>
            <div className={css.sidebar_controls_title}>Menu</div>
            <div className={css.sidebar_controls_group}>
                {menuItems.map(({ icon, label, triggerStep, dataStep }) => (
                    <>
                        <button
                            key={`${label}-${triggerStep}`}
                            className={clsx(css.sidebar_controls_item, css.border, {
                                [css.open_item]: isOpen,
                                [css.highlighted_item]: step === triggerStep,
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
                                        <div
                                            className={clsx(css.plus, {
                                                [css.fade]: step === 12,
                                                [css.pop]: step && step >= 13,
                                            })}
                                        >
                                            +
                                        </div>
                                    ) : (
                                        <div className={css.minus}>—</div>
                                    )}
                                </>
                            )}
                        </button>
                        {!cursorMoving && (
                            <SidebarItem
                                key={`${label}-${dataStep}`}
                                icon={icon}
                                label={label}
                                step={step}
                                triggerStep={triggerStep}
                                isOpen={isOpen}
                            />
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};
