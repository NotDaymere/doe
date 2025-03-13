import { ThemeConfig } from "antd/es/config-provider";

const theme: ThemeConfig = {
    inherit: false,
    components: {
        Layout: {
            bodyBg: "var(--bg-general)",
        },
    },
};

export default theme;
