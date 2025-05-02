import clsx from "clsx";
import sosStyles from "./SensOfSelf.module.less";
import styles from "../Personalization.module.less";
import { GeneralSettingsIcon } from "src/shared/icons/GeneralSettingsIcon";
import { GradientPazzleIcon } from "src/shared/icons/GradientPazzleIcon";
import { Puzzles } from "../../../../components/Puzzles/Puzzles";

export const SensOfSelf = () => {
    return (
        <div className={sosStyles.sos__container}>
            <div className={clsx(styles.personalization__header, sosStyles.sos__header)}>
                <div className={sosStyles.sos__header__title__container}>
                    <GradientPazzleIcon />
                    <p
                        className={clsx(
                            styles.personalization__header__title,
                            sosStyles.sos__header__title
                        )}
                    >
                        Sense of Self
                    </p>
                </div>

                <button
                    className={styles.personalization__saveBtn}
                    disabled
                    // onClick={() => handleSave()}
                >
                    <GeneralSettingsIcon />
                    <span>Save changes</span>
                </button>
            </div>
            <div className={sosStyles.sos__content__container}>
                <div className={sosStyles.sos__content}>
                    <p className={sosStyles.sos__content__description}>
                        Manually influence Doe’s{" "}
                        <span className={sosStyles.sos__content__description__highlight}>
                            sense of self
                        </span>
                        , which can influence its memory, perception of you, itself, and the world,
                        knowledge, static and emergent behaviors immediately and longitudinally in
                        addition to its encoded persona(s) or writing style(s).
                    </p>
                    <Puzzles />
                </div>
            </div>
        </div>
    );
};
