import css from "src/shared/layouts/OnboardingLayout/OnboardingLayout.module.less";

export function getBlurClasses(blur: string[] = []): string[] {
    return blur.map((area) => {
        switch (area) {
            case "all":
                return css.full_blur;
            case "input":
                return css.input_blur;
            case "history":
                return css.history_blur;
            case "body":
                return css.body_blur;
            case "magicbox":
                return css.magicbox_blur;
            case "navigate":
                return css.navigate_blur;
            case "message":
                return css.message_blur;
            // case "default":
            //   return css.blur;
            default:
                return "";
        }
    });
}
