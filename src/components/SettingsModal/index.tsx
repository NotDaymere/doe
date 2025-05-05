import clsx from "clsx";
import ReactDOM from "react-dom";
import css from "./SettingsModal.module.less";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { ReactComponent as CheckIcon } from "src/assets/icons/check-mark.svg";
import gear from "src/assets/icons/gear.svg";
import person from "src/assets/icons/person.svg";
import personPlus from "src/assets/icons/personPlus.svg";
import stack from "src/assets/icons/stack.svg";
import wire from "src/assets/icons/wire.svg";
import CrossIcon from "src/shared/icons/Cross.icon";

interface SettingsModalProps {
    step: number;
    nextStep: () => void;
    profileData: {
        name: string;
        email: string;
        photo: string;
    };
    setProfileData: Dispatch<
        SetStateAction<{
            name: string;
            email: string;
            photo: string;
        }>
    >;
}

export const SettingsModal = ({
    step,
    nextStep,
    profileData,
    setProfileData,
}: SettingsModalProps) => {
    if (step < 18 || step >= 19) return null;
    const [saved, setSaved] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData((prev) => ({ ...prev, photo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

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
                                        src={profileData.photo || "/temp/profile.jpg"}
                                        alt=""
                                        data-step="profile"
                                        className={css.settings_profile_img}
                                    />
                                    <div className={css.settings_content_img_buttons}>
                                        <button
                                            className={clsx(css.settings_content_change, {
                                                [css.highlighted]: step === 18.1,
                                            })}
                                            onClick={() => fileInputRef.current?.click()}
                                            data-step="profile-photo"
                                        >
                                            <img
                                                src={personPlus}
                                                alt=""
                                                className={css.settings_change_img}
                                            />
                                            Change Photo
                                        </button>
                                        <button
                                            className={css.settings_content_delete}
                                            onClick={() =>
                                                setProfileData((prev) => ({
                                                    ...prev,
                                                    photo: "/temp/profile.jpg",
                                                }))
                                            }
                                        >
                                            Delete Photo
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                            onChange={handlePhotoChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={css.settings_content_item}>
                            <div className={clsx(css.settings_content_row, { [css.saved]: saved })}>
                                <div>Profile Name</div>
                                <input
                                    value={profileData.name}
                                    onChange={(e) =>
                                        setProfileData((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                    data-step="profile-name"
                                    placeholder="John Doe"
                                    className={clsx(css.settings_input, {
                                        [css.highlighted]: step === 18.2,
                                    })}
                                />
                            </div>
                        </div>
                        <div className={css.settings_content_item}>
                            <div className={clsx(css.settings_content_row, { [css.saved]: saved })}>
                                <div>Email Address</div>
                                <input
                                    value={profileData.email}
                                    onChange={(e) =>
                                        setProfileData((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                    data-step="profile-email"
                                    placeholder="johndoe@gmail.com"
                                    className={clsx(css.settings_input, {
                                        [css.highlighted]: step === 18.3,
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={css.settings_footer}>
                        <button className={css.settings_footer_button}>Cancel</button>
                        <button
                            className={clsx(css.settings_footer_button, {
                                [css.highlighted]: step === 18.4,
                                [css.button_saved]: saved,
                            })}
                            onClick={() => setSaved(true)}
                            data-step="profile-save"
                        >
                            {!saved ? (
                                <img src={gear} alt="" className={css.settings_footer_img} />
                            ) : (
                                <div className={css.check_icon_container}>
                                    <CheckIcon className={css.check} />
                                </div>
                            )}
                            {saved ? "Saved" : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
