import { FC, ReactElement, useEffect, useState } from "react";
import SearchIcon from "src/shared/icons/Search.icon";
import ToggleSwitch from "src/shared/components/ToogleSwitch";
import TimeSpan from "src/shared/components/TimeSpan";
import { CSSTransition } from "react-transition-group";
import LinkWPIcon from "src/shared/icons/LinkWP.icon";
import LinkWOPIcon from "src/shared/icons/LinkWOP.icon";
import LinkIndexedIcon from "src/shared/icons/LinkIndexed.icon";
import StopIcon from "src/shared/icons/Stop.icon";
import MoveIcon from "src/shared/icons/Move.icon";
import { useClickOut } from "src/shared/hooks/useClickOut";
import css from "./SeeAllLinks.module.less";

interface ISearchResult {
    icon: ReactElement;
    text: string;
    password?: string;
    published: string;
    showPassword?: boolean;
}

const SEARCH_RESULTS: ISearchResult[] = [
    {
        icon: <LinkWPIcon width={15} height={15} />,
        text: "Bijection Language Instructions",
        password: `R7d{}F"@Pdp{ChZX/[Mh)Qh\\`,
        published: "11.10.24",
        showPassword: true,
    },
    {
        icon: <LinkIndexedIcon width={13} height={13} />,
        text: "Proving the Yoneda Lemma",
        published: "12.11.24",
    },
    {
        icon: <LinkWPIcon width={15} height={15} />,
        text: "Pronunciación en español importante",
        password: `R7d{}F"@Pdp{ChZX/[Mh)Qh\\`,
        published: "09.07.24",
        showPassword: false,
    },
    {
        icon: <LinkWPIcon width={15} height={15} />,
        text: "Essay Review and Commented Feedback",
        password: `R7d{}F"@Pdp{ChZX/[Mh)Qh\\`,

        published: "10.10.24",
        showPassword: false,
    },
    {
        icon: <LinkWPIcon width={15} height={15} />,
        text: "AES Decryption Approaches",
        password: `R7d{}F"@Pdp{ChZX/[Mh)Qh\\`,

        published: "01.29.24",
        showPassword: false,
    },
    {
        icon: <LinkWOPIcon width={10} height={12} />,
        text: "Liszt and Singers Relationships",
        published: "04.25.24",
    },
    {
        icon: <LinkWPIcon width={15} height={15} />,
        text: "Script for New Horror Movie",
        password: `R7d{}F"@Pdp{ChZX/[Mh)Qh\\`,
        published: "06.16.24",
        showPassword: false,
    },
];

interface IProps {
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

const SeeAllLinks: FC<IProps> = ({ isActive, setIsActive }) => {
    const [results, setResults] = useState(SEARCH_RESULTS);
    const [isCaseSensitive, setIsCaseSensitive] = useState(false);
    const [search, setSearch] = useState("");
    const [showSeeAllLink, setShowSeeAllLink] = useState(false);

    // const ref = useClickOut({
    //     handler: () => {
    //         setShowSeeAllLink(false);
    //         setIsActive(false);
    //     },
    // });

    useEffect(() => {
        if (isActive) {
            setShowSeeAllLink(true);

            return () => {
                setShowSeeAllLink(false);
                setIsActive(false);
            };
        } else {
            setShowSeeAllLink(false);
            setIsActive(false);
        }
    }, [isActive]);

    return (
        <CSSTransition in={showSeeAllLink} timeout={500} classNames={css} unmountOnExit>
            <div className={css.seeAllLinks}>
                <div className={css.searchInput}>
                    <input
                        type="text"
                        className={css.input}
                        placeholder=""
                        value={search}
                        onChange={(e: any) => setSearch(e.target.value)}
                    />
                    <SearchIcon width={14} height={14} className={css.startAdornment} />
                </div>
                <div className={css.searchResults}>
                    <div className={css.searchResultsActions}>
                        <TimeSpan />
                        <ToggleSwitch
                            label="Case Sensitivity"
                            checked={isCaseSensitive}
                            onChange={(event: any) => setIsCaseSensitive(event.target.checked)}
                        />
                    </div>
                    <div className={css.results}>
                        <div className={css.bold}>Name</div>
                        <div className={css.bold}>Password</div>
                        <div className={css.bold}>Published</div>
                        <div className={css.bold}></div>

                        {results.map((result, index) => (
                            <>
                                <div key={index} className={css.linkResult}>
                                    <div className={css.resultIcon}>{result.icon}</div>
                                    <span className={css.link}>{result.text}</span>
                                </div>
                                <div className={css.password}>
                                    {result.password ? (
                                        result.showPassword ? (
                                            result.password
                                        ) : (
                                            <div className={css.hidePassword}>
                                                {Array.from({ length: 12 }).map(() => (
                                                    <div className={css.dot} />
                                                ))}
                                            </div>
                                        )
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className={css.published}>{result.published}</div>
                                <div className={css.actions}>
                                    <button className={css.removeButton}>
                                        <StopIcon width={15} height={15} />
                                    </button>
                                    <button className={css.moveButton}>
                                        <MoveIcon width={15} height={15} />
                                    </button>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default SeeAllLinks;
