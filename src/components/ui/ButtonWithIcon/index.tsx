import { Button, ButtonProps } from "antd";
import classNames from "classnames";
import { FC } from "react";
import { IconsType, SvgIcon } from "src/components/icon";
import "./index.less";

type Props = {
    icon: IconsType;
    active?: boolean;
} & ButtonProps;

const ButtonWithIcon: FC<Props> = ({ icon, active, ...props }) => {
    return (
        <Button
            {...props}
            className={classNames("btn-with-icon", active ? "active" : "inactive", props.className)}
        >
            <SvgIcon type={icon} />
        </Button>
    );
};

export default ButtonWithIcon;
