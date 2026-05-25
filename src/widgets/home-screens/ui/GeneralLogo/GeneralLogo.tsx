import GeneralLogoIcon from "src/shared/icons/GeneralLogo";
import "./GeneralLogo.less";

interface Props {
    onClick?: () => void;
}
export default function GeneralLogo({ onClick }: Props) {
    return (
        <button className="general-logo-container" onClick={onClick}>
            <GeneralLogoIcon />
        </button>
    );
}
