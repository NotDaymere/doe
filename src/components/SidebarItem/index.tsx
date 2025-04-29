import { ChatMenu } from "../ChatMenu";
import { CorporasMenu } from "../CorporasMenu";
import { FavouritesMenu } from "../FavouritesMenu";
import { TagsMenu } from "../TagsMenu";

interface SidebarItemProps {
    icon: string;
    label: string;
    step?: number;
    triggerStep: number;
    isOpen: boolean;
}

export function SidebarItem({ label, step, triggerStep, isOpen }: SidebarItemProps) {
    if (step === 13)
        return <CorporasMenu step={step} triggerStep={triggerStep} isOpen={isOpen} label={label} />;
    if (step === 14)
        return <ChatMenu step={step} triggerStep={triggerStep} isOpen={isOpen} label={label} />;
    if (step === 15)
        return (
            <FavouritesMenu step={step} triggerStep={triggerStep} isOpen={isOpen} label={label} />
        );
    if (step === 16)
        return <TagsMenu step={step} triggerStep={triggerStep} isOpen={isOpen} label={label} />;

    return null;
}
