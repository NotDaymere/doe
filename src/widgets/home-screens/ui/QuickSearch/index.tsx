import { FC, useEffect, useState } from "react";
import CrossIcon from "src/shared/icons/Cross.icon";
import QuickSearchIcon from "src/shared/icons/QuickSearch.icon";
import SearchIcon from "src/shared/icons/Search.icon";
import StarsIcon from "src/shared/icons/Stars.icon";
import css from "./QuickSearch.module.less";
import ToggleSwitch from "src/shared/components/ToogleSwitch";
import TimeSpan from "src/shared/components/TimeSpan";

const SHOW_QUICK_SEARCH_LABEL_TIME = 5000;

const SEARCH_RESULTS = [
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLabel(false);
        }, SHOW_QUICK_SEARCH_LABEL_TIME);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

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
                <input type="text" className={css.input} />
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
                <div className={css.results}>
                    {SEARCH_RESULTS.map((result) => (
                        <div className={css.result} key={result.text}>
                            <div className={css.iconResult}>{result.icon}</div>
                            <span>{result.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuickSearch;
