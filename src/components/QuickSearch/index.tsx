import clsx from "clsx";
import { useEffect, useState } from "react";
import { ReactComponent as BubbleIcon } from "src/assets/icons/bubble.svg";
import { ReactComponent as CalendarIcon } from "src/assets/icons/calendar.svg";
import { ReactComponent as ChevronIcon } from "src/assets/icons/chevron.svg";
import { ReactComponent as SearchIcon } from "src/assets/icons/search-icon.svg";
import { ReactComponent as SparkleIcon } from "src/assets/icons/sparkles-icon.svg";
import { useTypewriterEffect } from "src/hooks/useTypewriterEffect";
import CrossIcon from "src/shared/icons/Cross.icon";
import css from "./QuickSearch.module.less";

interface QuickSearchProps {
    step: number;
}

export const QuickSearch = ({ step }: QuickSearchProps) => {
    if (step < 55 || step > 56) return null;
    const [filteredSuggestions, setFilteredSuggestions] = useState(suggestionsMock);
    const [isCaseSensitive, setIsCaseSensitive] = useState(false);

    const { text: typedSearchInput } = useTypewriterEffect({
        text: "Yoneda Lemma",
        speed: 200,
        startTyping: step >= 56,
    });

    useEffect(() => {
        if (typedSearchInput) {
            setFilteredSuggestions(
                suggestionsMock.filter((s) => {
                    if (isCaseSensitive) {
                        return s.text.includes(typedSearchInput);
                    }
                    return s.text.toLowerCase().includes(typedSearchInput.toLowerCase());
                })
            );
        }
    }, [typedSearchInput, isCaseSensitive]);

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;

        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();
        const matchIndex = lowerText.indexOf(lowerQuery);

        if (matchIndex === -1) return text;

        const before = text.slice(0, matchIndex);
        const match = text.slice(matchIndex, matchIndex + query.length);
        const after = text.slice(matchIndex + query.length);

        return (
            <>
                {before}
                <strong className={css.quick_search_find}>{match}</strong>
                {after}
            </>
        );
    };

    return (
        <div className={css.quick_search_wrapper}>
            <div className={css.quick_search_head}>
                <div className={css.quick_search_symbols}>⌘ K</div>
                <p>Quick Search</p>
            </div>

            <div className={css.quick_search_input}>
                <div className={css.quick_search_left}>
                    <div className={css.quick_search_icon} data-step="search">
                        <SearchIcon />
                    </div>
                    <div className={css.quick_search_text}>
                        {typedSearchInput.split("").map((char, index) => (
                            <>
                                <span
                                    key={index}
                                    className={clsx(css.letter, {
                                        [css.space]: char === " ",
                                    })}
                                    style={{ animationDelay: `${index * 0.01}s` }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            </>
                        ))}
                        <span className={css.caret} />
                    </div>
                    <input autoFocus disabled />
                </div>
                <button className={css.quick_search_close}>
                    <CrossIcon />
                </button>
                <div className={clsx(css.quick_search_suggestions, { [css.hidden]: step === 55 })}>
                    <div className={css.suggestions_head}>
                        <div className={css.suggestions_calendar}>
                            <div className={css.suggestions_calendar_icon}>
                                <CalendarIcon />
                            </div>
                            <div className={css.suggestions_calendar_text}>Time Span</div>
                            <div className={css.suggestions_calendar_chevron}>
                                <ChevronIcon />
                            </div>
                        </div>
                        <div className={css.suggestions_toggle_container}>
                            <div className={css.suggestions_toggle_text}>Case Sensitivity</div>
                            <div className={css.suggestions_toggle}>
                                <label className={css.switch}>
                                    <input
                                        type="checkbox"
                                        checked={isCaseSensitive}
                                        onChange={() => setIsCaseSensitive((prev) => !prev)}
                                    />
                                    <span className={css.slider}></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={css.suggestions_list_container}>
                        <div className={css.suggestions_list}>
                            {filteredSuggestions.slice(0, 3).map((item) => (
                                <div key={item.id} className={css.suggestion_item}>
                                    {item.icon === "sparkle" ? (
                                        <div className={css.suggestion_icon}>
                                            <SparkleIcon />
                                        </div>
                                    ) : (
                                        <div className={css.suggestion_icon}>
                                            <BubbleIcon />
                                        </div>
                                    )}
                                    {highlightMatch(item.text, typedSearchInput)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const suggestionsMock = [
    {
        id: 1,
        text: "Understanding Limits and Colimits",
        icon: "bubble",
    },
    {
        id: 2,
        text: "Explain the Yoneda Lemma",
        icon: "bubble",
    },
    {
        id: 3,
        text: "Basics of Category Theory",
        icon: "bubble",
    },
    {
        id: 4,
        text: "Introduction to Functors and Natural Transformations",
        icon: "bubble",
    },
    {
        id: 5,
        text: "Set Theory: Foundations and Applications",
        icon: "bubble",
    },
    {
        id: 6,
        text: "Hom Functor and Representable Functors",
        icon: "sparkle",
    },
    {
        id: 7,
        text: "...the Yoneba Lemma in category theory",
        icon: "bubble",
    },
    {
        id: 8,
        text: "Exploring Yonida Lemna applications",
        icon: "sparkle",
    },
    {
        id: 9,
        text: "...Result: The Yoneda Lemma and the Yoneda Embedding...",
        icon: "sparkle",
    },
    {
        id: 10,
        text: "Simple proof of the yoneda Lemma",
        icon: "bubble",
    },
];
