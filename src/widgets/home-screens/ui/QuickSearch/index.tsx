import { FC, ReactElement, useEffect, useState } from "react";
import CrossIcon from "src/shared/icons/Cross.icon";
import QuickSearchIcon from "src/shared/icons/QuickSearch.icon";
import SearchIcon from "src/shared/icons/Search.icon";
import StarsIcon from "src/shared/icons/Stars.icon";
import css from "./QuickSearch.module.less";
import ToggleSwitch from "src/shared/components/ToogleSwitch";
import TimeSpan from "src/shared/components/TimeSpan";

interface IP {
    text: string;
    query: string;
}

const HighlightedText: FC<IP> = ({ text, query }) => {
    if (!query) {
        return <span>{text}</span>;
    }

    const parts = [];
    let remainingText = text;
    let queryIndex = remainingText.toLowerCase().indexOf(query.toLowerCase());

    while (queryIndex !== -1) {
        parts.push(<span>{remainingText.slice(0, queryIndex)}</span>);
        parts.push(<strong>{remainingText.slice(queryIndex, queryIndex + query.length)}</strong>);
        remainingText = remainingText.slice(queryIndex + query.length);
        queryIndex = remainingText.toLowerCase().indexOf(query.toLowerCase(), 0);
    }

    parts.push(<span>{remainingText}</span>);

    return <>{parts}</>;
};

const SHOW_QUICK_SEARCH_LABEL_TIME = 5000;

interface ISearchResult {
    icon: ReactElement;
    text: string;
}

const SEARCH_RESULTS: ISearchResult[] = [
    {
        icon: <StarsIcon width={9} height={12} />,
        text: "...Result: The Yoneda Lemma and the Yoneda Embedding provide...",
    },
    {
        icon: <StarsIcon width={9} height={12} />,
        text: "...theory, The Yoneda Lemma. This lemma is central to category th...",
    },
    {
        icon: <StarsIcon width={9} height={12} />,
        text: "Explain the Yoneda Lemma",
    },
];

interface IProps {
    onClose: (showQuickSearch: boolean) => void;
}

const QuickSearch: FC<IProps> = ({ onClose }) => {
    const [showLabel, setShowLabel] = useState(true);
    const [isCaseSensitive, setIsCaseSensitive] = useState(false);
    const [results, setResults] = useState<ISearchResult[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLabel(false);
        }, SHOW_QUICK_SEARCH_LABEL_TIME);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        if (!search) {
            setResults([]);
        } else {
            const results = SEARCH_RESULTS.filter((result) =>
                isCaseSensitive
                    ? result.text.includes(search)
                    : result.text.toLowerCase().includes(search.toLowerCase())
            );
            setResults([...results]);
        }
    }, [search, isCaseSensitive]);

    const handleCaseSensitivityToggle = (event: any) => {
        setIsCaseSensitive(event.target.checked);
    };

    return (
        <div className={css.quickSearch}>
            {showLabel && (
                <div className={css.label} id="quickSearchLabel">
                    <div className={css.iconWrapper}>
                        <QuickSearchIcon width={18} height={9} />
                    </div>
                    <span>Quick Search</span>
                </div>
            )}
            <div className={css.searchInput}>
                <input
                    type="text"
                    className={css.input}
                    placeholder="Yoneda Lem"
                    value={search}
                    onChange={(e: any) => setSearch(e.target.value)}
                />
                <SearchIcon width={14} height={14} className={css.startAdornment} />
                <button className={css.endAdornment} onClick={() => onClose(false)}>
                    <CrossIcon width={8} height={8} />
                </button>
            </div>
            <div className={css.searchResults}>
                <div className={css.actions}>
                    <TimeSpan />
                    <ToggleSwitch
                        label="Case Sensitivity"
                        checked={isCaseSensitive}
                        onChange={handleCaseSensitivityToggle}
                    />
                </div>
                {!!results.length ? (
                    <div className={css.results}>
                        {results?.map((result) => (
                            <div className={css.result} key={result.text}>
                                <div className={css.iconResult}>{result.icon}</div>
                                <span>
                                    <HighlightedText text={result.text} query={search} />
                                </span>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default QuickSearch;
