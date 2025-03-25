import css from "./TalkingAniation.module.less";

const TalkingAnimation = () => (
    <>
        <div className={css.glowingRing}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path d="M100,35 C140,40 175,80 145,115 C120,150 110,170 90,150 C70,125 45,110 55,80 C65,60 75,30 100,35 Z" />
            </svg>
        </div>
        <div className={css.glowingRing2}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path d="M100,35 C140,40 175,80 145,115 C120,150 110,170 90,150 C70,125 45,110 55,80 C65,60 75,30 100,35 Z" />
            </svg>
        </div>
        <div className={css.glowingRing3}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path d="M100,35 C140,40 175,80 145,115 C120,150 110,170 90,150 C70,125 45,110 55,80 C65,60 75,30 100,35 Z" />
            </svg>
        </div>
    </>
);

export default TalkingAnimation;
