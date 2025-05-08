import { FC, ReactElement, useEffect, useState } from "react";
import SearchIcon from "src/shared/icons/Search.icon";
import ToggleSwitch from "src/shared/components/ToogleSwitch";
import TimeSpan from "src/shared/components/TimeSpan";
import { CSSTransition } from "react-transition-group";
import LinkWPIcon from "src/shared/icons/LinkWP.icon";
import LinkWOPIcon from "src/shared/icons/LinkWOP.icon";
import LinkIndexedIcon from "src/shared/icons/LinkIndexed.icon";
import MoveIcon from "src/shared/icons/Move.icon";
import { useClickOut } from "src/shared/hooks/useClickOut";
import css from "./SeeAllLinks.module.less";
import RemoveIcon from "src/shared/icons/Remove.icon";

enum LinkType {
    LINK_WITH_PW = "LINK_WITH_PW",
    LINK_WITHOUT_INDEXING_OR_PW = "LINK_WITHOUT_INDEXING_OR_PW",
    LINK_WITHOUT_PW = "LINK_WITHOUT_PW",
}

interface ISearchResult {
    id: string;
    icon: ReactElement;
    text: string;
    password?: string;
    published: string;
    linkType: LinkType;
}

const SEARCH_RESULTS: ISearchResult[] = [
    {
        id: "search_0",
        icon: <LinkWPIcon width={15} height={15} />,
        text: "Bijection Language Instructions",
        password: `R7d{}F"@Pdp{ChZX/[Mh)Qh\\`,
        published: "11.10.24",
        linkType: LinkType.LINK_WITH_PW,
    },
    {
        id: "search_1",
        icon: <LinkIndexedIcon width={13} height={13} />,
        text: "Proving the Yoneda Lemma",
        published: "12.11.24",
        linkType: LinkType.LINK_WITHOUT_PW,
    },
    {
        id: "search_2",
        icon: <LinkWPIcon width={15} height={15} />,
        text: "Pronunciación en español importante",
        password: `R7d{}F"@Pdp{ChZX/[Mh)Qh\\`,
        published: "09.07.24",
        linkType: LinkType.LINK_WITH_PW,
    },
    {
        id: "search_3",
        icon: <LinkWPIcon width={15} height={15} />,
        text: "Essay Review and Commented Feedback",
        password: `R7d{}F"@Pdp{ChZX/[Mh)Qh\\`,
        published: "10.10.24",
        linkType: LinkType.LINK_WITH_PW,
    },
    {
        id: "search_4",
        icon: <LinkWPIcon width={15} height={15} />,
        text: "AES Decryption Approaches",
        password: `R7d{}F"@Pdp{ChZX/[Mh)Qh\\`,
        published: "01.29.24",
        linkType: LinkType.LINK_WITH_PW,
    },
    {
        id: "search_5",
        icon: <LinkWOPIcon width={10} height={12} />,
        text: "Liszt and Singers Relationships",
        published: "04.25.24",
        linkType: LinkType.LINK_WITHOUT_INDEXING_OR_PW,
    },
    {
        id: "search_6",
        icon: <LinkWPIcon width={15} height={15} />,
        text: "Script for New Horror Movie",
        password: `R7d{}F"@Pdp{ChZX/[Mh)Qh\\`,
        published: "06.16.24",
        linkType: LinkType.LINK_WITH_PW,
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
    const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
    const [hoveredPasswordId, setHoveredPasswordId] = useState<string | null>(null);

    useEffect(() => {
        if (!search) {
            setResults(SEARCH_RESULTS);
        } else {
            const results = SEARCH_RESULTS.filter((result) =>
                isCaseSensitive
                    ? result.text.includes(search)
                    : result.text.toLowerCase().includes(search.toLowerCase())
            );
            setResults([...results]);
        }
    }, [search, isCaseSensitive]);

    const handlePasswordClick = async (e: Event, id: string) => {
        if (showPasswords[id]) {
            const password = results.find((result) => result.id === id)?.password || "";
            navigator.clipboard.writeText(password);
        } else {
            setShowPasswords((prevState) => {
                return {
                    ...prevState,
                    [id]: true,
                };
            });
        }
    };

    const handleDeleteClick = (id: string) => {
        setResults(results.filter((item) => item.id !== id));
    };

    const handleLinkTypeButtonClick = (id: string) => {
        setResults((prevResults) =>
            prevResults.map((result) => {
                if (result.id === id) {
                    let nextType: LinkType;

                    if (result.linkType === LinkType.LINK_WITH_PW) {
                        nextType = LinkType.LINK_WITHOUT_INDEXING_OR_PW;
                    } else if (result.linkType === LinkType.LINK_WITHOUT_INDEXING_OR_PW) {
                        nextType = LinkType.LINK_WITHOUT_PW;
                    } else {
                        nextType = LinkType.LINK_WITH_PW;
                    }

                    return { ...result, linkType: nextType };
                }
                return result;
            })
        );
    };

    const renderButton = (linkType: LinkType) => {
        switch (linkType) {
            case LinkType.LINK_WITH_PW:
                return <LinkWPIcon width={15} height={15} />;
            case LinkType.LINK_WITHOUT_INDEXING_OR_PW:
                return <LinkIndexedIcon width={13} height={13} />;
            case LinkType.LINK_WITHOUT_PW:
                return <LinkWOPIcon width={10} height={12} />;
            default:
                return null;
        }
    };

    const ref = useClickOut({
        handler: () => {
            // setShowSeeAllLink(false);
            // setIsActive(false);
        },
    });

    useEffect(() => {
        if (isActive) {
            setShowSeeAllLink(true);

            return () => {
                // setShowSeeAllLink(false);
                // setIsActive(false);
            };
        } else {
            // setShowSeeAllLink(false);
            // setIsActive(false);
        }
    }, [isActive]);

    return (
        <CSSTransition in={showSeeAllLink} timeout={500} classNames={css} unmountOnExit>
            <div
                className={css.seeAllLinks}
                ref={ref}
                onMouseDown={(e: any) => {
                    e.stopPropagation();
                }}
            >
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
                    {results.length > 0 && (
                        <div className={css.results}>
                            <div className={css.bold}>Name</div>
                            <div className={css.bold}>Password</div>
                            <div className={css.bold}>Published</div>
                            <div className={css.bold}></div>
                            {results.map((result, index) => (
                                <>
                                    <div key={index} className={css.linkResult}>
                                        <button
                                            className={css.resultIcon}
                                            onClick={() => handleLinkTypeButtonClick(result.id)}
                                        >
                                            {renderButton(result.linkType)}
                                        </button>
                                        <span className={css.link}>{result.text}</span>
                                    </div>
                                    <div
                                        className={css.password}
                                        onClick={(e: any) => handlePasswordClick(e, result.id)}
                                        onMouseEnter={() => setHoveredPasswordId(result.id)}
                                        onMouseLeave={() => setHoveredPasswordId(null)}
                                    >
                                        {result.password &&
                                            (showPasswords[result.id] ? (
                                                result.password
                                            ) : (
                                                <div className={css.passwordWrapper}>
                                                    <div className={css.hidePassword}>
                                                        {Array.from({ length: 12 }).map(() => (
                                                            <div className={css.dot} />
                                                        ))}
                                                    </div>
                                                    {hoveredPasswordId === result.id && (
                                                        <div className={css.passwordHint}>
                                                            click to reveal
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                    <div className={css.published}>{result.published}</div>
                                    <div className={css.actions}>
                                        <button
                                            className={css.removeButton}
                                            onClick={() => handleDeleteClick(result.id)}
                                        >
                                            <RemoveIcon width={15} height={15} />
                                        </button>
                                        <button className={css.moveButton}>
                                            <MoveIcon width={15} height={15} />
                                        </button>
                                    </div>
                                </>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </CSSTransition>
    );
};

export default SeeAllLinks;
