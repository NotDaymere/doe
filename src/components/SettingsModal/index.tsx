import clsx from "clsx";
import ReactDOM from "react-dom";
import css from "./SettingsModal.module.less";

import gear from "src/assets/icons/gear.svg";
import person from "src/assets/icons/person.svg";
import personPlus from "src/assets/icons/personPlus.svg";
import stack from "src/assets/icons/stack.svg";
import wire from "src/assets/icons/wire.svg";
import CrossIcon from "src/shared/icons/Cross.icon";

interface SettingsModalProps {
    step: number;
    nextStep: () => void;
}

export const SettingsModal = ({ step, nextStep }: SettingsModalProps) => {
    if (step !== 18) return null;

    return ReactDOM.createPortal(
        <div className={css.settings_container}>
            <div className={css.settings_head}>
                <h4 className={css.settings_title}>Settings</h4>
                <button className={css.settings_close} onClick={nextStep}>
                    <CrossIcon />
                </button>
            </div>
            <div className={css.settings_body}>
                <div className={css.settings_nav}>
                    <div className={clsx(css.settings_nav_item, css.active)}>
                        <img src={person} alt="" className={css.settings_nav_img} />
                        Profile
                    </div>
                    <div className={css.settings_nav_item}>
                        <img src={gear} alt="" className={css.settings_nav_img} />
                        General
                    </div>
                    <div className={css.settings_nav_item}>
                        <img src={stack} alt="" className={css.settings_nav_img} />
                        Model Settings
                    </div>
                    <div className={css.settings_nav_item}>
                        <img src={wire} alt="" className={css.settings_nav_img} />
                        Apps Integration
                    </div>
                </div>
                <div className={css.settings_content}>
                    <div className={css.settings_info}>
                        <div className={css.settings_content_item}>
                            <div className={css.settings_content_head}>Edit Profile info</div>
                        </div>
                        <div className={css.settings_content_item}>
                            <div className={css.settings_content_row}>
                                Profile Photo
                                <div className={css.settings_content_buttons}>
                                    <img
                                        src="/temp/profile.jpg"
                                        alt=""
                                        data-step="profile"
                                        className={css.settings_profile_img}
                                    />
                                    <button className={css.settings_content_change}>
                                        <img
                                            src={personPlus}
                                            alt=""
                                            className={css.settings_change_img}
                                        />
                                        Change Photo
                                    </button>
                                    <button className={css.settings_content_delete}>
                                        Delete Photo
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={css.settings_content_item}>
                            <div className={css.settings_content_row}>
                                Profile Name
                                <input placeholder="John Doe" className={css.settings_input} />
                            </div>
                        </div>
                        <div className={css.settings_content_item}>
                            <div className={css.settings_content_row}>
                                Email Address
                                <input
                                    placeholder="johndoe@gmail.com"
                                    className={css.settings_input}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={css.settings_footer}>
                        <button className={css.settings_footer_button}>Cancel</button>
                        <button className={css.settings_footer_button}>
                            <img src={gear} alt="" className={css.settings_footer_img} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
