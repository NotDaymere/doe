import React, { useState, useEffect, useRef } from "react";
import "./Reflections.less";
import ReflectionIcon from "../../../../../../shared/icons/ReflectionIcon";
import StarsIcon from "../../../../../../shared/icons/Stars.icon";
import UserMessageIcon from "../../../../../../shared/icons/UserMessage.icon";
import SearchIcon from "../../../../../../shared/icons/SearchIcon";
import StraightPin from "../../../../../../shared/icons/StraightPin.icon";
import MessagesOfDayList from "./MessagesOfDayList/MessagesOfDayList";
import { ReflectionsMessagesMockData } from "./ReflectionsMessageMockData";
import { ReflectionsMessageItem } from "./ReflectionsMessageItem/ReflectionsMessageItem";
import { CSSTransition } from "react-transition-group";
import ArrowUpReflectionsIcon from "../../../../../../shared/icons/ArrowUpReflectionsIcon";
import CloseSearchInputIcon from "../../../../../../shared/icons/CloseSearchInputIcon";
import LatestMessageInfo from "./LatestMessageInfo";
import { useAppStore, useChatStore } from "../../../../../../shared/providers";
import {clsx} from "clsx";

const ViewModes = {
    CLOSED: "closed",
    SMALL: "small",
    EXPANDED: "expanded",
};

export default function Reflections() {
    const [mode, setMode] = useState(ViewModes.CLOSED);
    const [isHovering, setIsHovering] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const { isSideBarOpen } = useAppStore();
    const [progress, setProgress] = useState(0);
    const [startProgress, setStartProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState<number | null>(null);
    const [showDragBar, setShowDragBar] = useState(false);
    const maxDragDistance = 350;
    const threshold = 0.01;

    const [messagesData, setMessagesData] = useState(ReflectionsMessagesMockData);
    const [isPinnedListVisible, setPinnedListVisible] = useState(false);
    const [messageFilter, setMessageFilter] = useState<"user" | "code">("code");
    const [isAddingMessage, setIsAddingMessage] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const [isHoveringIcon, setIsHoveringIcon] = useState(false);
    const [isHoveringContainer, setIsHoveringContainer] = useState(false);
    const [persistSmall, setPersistSmall] = useState(false);

    const [isCursorNearTop, setIsCursorNearTop] = useState(false);
    const topEdgeThreshold = 20;
    const dragBarTimerRef = useRef<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLDivElement>(null);
    const collapseTimerRef = useRef<number | null>(null);

    const [containerWidth, setContainerWidth] = useState(0);

    const smallHeight = 80;
    const expandedHeight = 430;
    const smallWidth = 200;
    const expandedWidth = 460;

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        if (mode === ViewModes.SMALL && !isHovering && !isPinned) {
            const timer = setTimeout(() => {
                setMode(ViewModes.CLOSED);
            }, 5000);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [mode, isHovering, isPinned]);

    useEffect(() => {
        if (isDragging) {
            document.body.style.cursor = "grabbing";
        } else {
            document.body.style.cursor = "";
        }
        return () => {
            document.body.style.cursor = "";
        };
    }, [isDragging]);


    const handleTogglePinned = (id: number) => {
        setMessagesData((prev) =>
            prev.map((message) =>
                message.id === id ? { ...message, isPinned: !message.isPinned } : message
            )
        );
    };

    const messagesByDay = messagesData.reduce(
        (acc: Record<string, typeof ReflectionsMessagesMockData[0][]>, message) => {
            const day = message.day;
            if (!acc[day]) acc[day] = [];
            acc[day].push(message);
            return acc;
        },
        {}
    );

    const standardDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const todayAbbr = new Date().toLocaleDateString("en-US", { weekday: "short" });
    const descendingOrder: string[] = [];
    const currentIndex = standardDays.indexOf(todayAbbr);
    for (let i = 0; i < standardDays.length; i++) {
        descendingOrder.push(
            standardDays[(currentIndex - i + standardDays.length) % standardDays.length]
        );
    }
    const finalOrder = descendingOrder.map((day, index) =>
        index === 0 ? "Today" : day
    );

    const sortedMessagesByDay = standardDays.map((day) => ({
        day,
        messages: (messagesByDay[day] || []).filter((message) =>
            messageFilter === "user" ? message.isUser : message.isCode
        ),
    }));

    const finalSortedMessages = finalOrder.map((day) => {
        const entry = sortedMessagesByDay.find(
            (item) => item.day === (day === "Today" ? todayAbbr : day)
        );
        return { day, messages: entry ? entry.messages : [] };
    });

    const pinnedMessages = messagesData.filter(
        (message) =>
            message.isPinned &&
            (messageFilter === "user" ? message.isUser : message.isCode)
    );

    const handleMarkAsRead = (ids: number[]) => {
        setMessagesData((prev) =>
            prev.map((message) =>
                ids.includes(message.id) ? { ...message, isRead: true } : message
            )
        );
    };

    const startCollapseTimer = () => {
        if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
        collapseTimerRef.current = window.setTimeout(() => {
            setPersistSmall(false);
            setProgress(0);
        }, 5000);
    };

    const cancelCollapseTimer = () => {
        if (collapseTimerRef.current) {
            clearTimeout(collapseTimerRef.current);
            collapseTimerRef.current = null;
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setProgress(0);
                setPersistSmall(false);
                setMode(ViewModes.CLOSED);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutsideInput = (e: MouseEvent) => {
            if (
                isAddingMessage &&
                messageInputRef.current &&
                !messageInputRef.current.contains(e.target as Node)
            ) {
                setIsAddingMessage(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutsideInput);
        return () => document.removeEventListener("mousedown", handleClickOutsideInput);
    }, [isAddingMessage]);

    const handleMouseEnterIcon = () => {
        setIsHoveringIcon(true);
        cancelCollapseTimer();
        setPersistSmall(true);
        if (progress === 0) setProgress(0.001);
        if (mode === ViewModes.CLOSED) {
            setMode(ViewModes.SMALL);
        }
    };
    const handleMouseLeaveIcon = () => setIsHoveringIcon(false);

    const handleContainerMouseEnter = () => {
        setIsHoveringContainer(true);
        cancelCollapseTimer();
        setPersistSmall(true);
        if (dragBarTimerRef.current) {
            clearTimeout(dragBarTimerRef.current);
            dragBarTimerRef.current = null;
        }
    };
    const handleMouseEnterContainer = () => {
        if (mode === ViewModes.SMALL || mode === ViewModes.EXPANDED) {
            setIsHovering(true);
            setShowDragBar(true);
        }
    };
    const handleContainerMouseLeave = () => {
        setIsHoveringContainer(false);
        dragBarTimerRef.current = window.setTimeout(() => {
            setIsCursorNearTop(false);
        }, 2000);
        // if (containerMode === ViewModes.SMALL) startCollapseTimer();

        const handleMouseLeaveContainer = () => {
            if (mode === ViewModes.SMALL || mode === ViewModes.EXPANDED) {
                setIsHovering(false);
                setShowDragBar(false);
            }
        };

        const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const offsetY = e.clientY - rect.top;
                if (offsetY < topEdgeThreshold) {
                    setIsCursorNearTop(true);
                } else {
                    setIsCursorNearTop(false);
                }
            }
            ;

            if ((mode !== ViewModes.SMALL && mode !== ViewModes.EXPANDED) || !containerRef.current)
                return;
            const rect = containerRef.current.getBoundingClientRect();
            const relativeY = e.clientY - rect.top;
            setShowDragBar(relativeY < 30 ? true : showDragBar);
        };

        const handleDragBarMouseEnter = () => {
            if (mode === ViewModes.SMALL || mode === ViewModes.EXPANDED) {
                setShowDragBar(true);
            }
        };

        const handleDragBarMouseLeave = () => {
            if (mode === ViewModes.SMALL || mode === ViewModes.EXPANDED) {
                setShowDragBar(false);
            }
        };

        const handleDragBarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            cancelCollapseTimer();
        };
        const handleSmallMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
            setStartY(e.clientY);
            setStartProgress(progress);
            setIsDragging(true);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || startY === null) return;
            const distance = startY - e.clientY;
            if (distance > 50) {
                setMode(ViewModes.EXPANDED);
                setIsDragging(false);
            }
            const delta = startY - e.clientY;
            let newProgress = startProgress + delta / maxDragDistance;
            newProgress = Math.max(0, Math.min(newProgress, 1));
            setProgress(newProgress);
        };

        const handleMouseUpOrLeave = () => {
            setIsDragging(false);
            setStartY(null);
        };

        const handlePinClick = () => {
            setIsPinned((prev) => !prev);
        };

        const handleExpandByPlus = () => {
            if (mode === ViewModes.SMALL) {
                setMode(ViewModes.EXPANDED);
            }
        };

        const handleCollapse = () => {
            if (mode === ViewModes.EXPANDED) {
                setMode(ViewModes.SMALL);
            }
        };

        useEffect(() => {
            if (isDragging) {
                window.addEventListener("mousemove", handleMouseMove);
                window.addEventListener("mouseup", handleMouseUpOrLeave);
                window.addEventListener("mouseleave", handleMouseUpOrLeave);
            } else {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUpOrLeave);
                window.removeEventListener("mouseleave", handleMouseUpOrLeave);
            }
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUpOrLeave);
                window.removeEventListener("mouseleave", handleMouseUpOrLeave);
            };
        }, [isDragging, startY, startProgress]);

        const computedHeight = smallHeight + (expandedHeight - smallHeight) * progress;
        const containerMode =
            progress < threshold
                ? (isHoveringIcon || isHoveringContainer || persistSmall ? ViewModes.SMALL : ViewModes.CLOSED)
                : ViewModes.EXPANDED;
        const finalHeight = containerMode === ViewModes.CLOSED ? 40 : computedHeight;
        const finalWidth = containerMode === ViewModes.CLOSED ? 40 : containerMode === ViewModes.SMALL ? 200 : 360;

        const handleToggleFilter = (filter: "user" | "code") => {
            setMessageFilter(filter);
        };

        const allRead = messagesData.every(message => message.isRead);

        return (
            <div className={clsx(
                "reflections-wrapper",
                { "sidebar-open": isSideBarOpen }
            )}>
                <div
                    ref={containerRef}
                    className={clsx("reflections-container", containerMode)}
                    style={{
                        userSelect: "none",
                        height: finalHeight,
                        width: finalWidth,
                        transition: isDragging
                            ? "height 0s ease, width 300ms ease"
                            : "height 300ms ease, width 300ms ease"

                    }}

                    onMouseEnter={handleContainerMouseEnter}
                    onMouseLeave={handleContainerMouseLeave}
                    onMouseMove={handleContainerMouseMove}
                >
                    <div
                        className={`icon ${allRead ? "all-read" : ""}`}
                        onMouseEnter={handleMouseEnterIcon}
                        onMouseLeave={handleMouseLeaveIcon}
                    >
                        <ReflectionIcon fill="currentColor" />
                    </div>

                    {containerMode !== ViewModes.CLOSED && (
                        <div
                            className="small-drag-bar"
                            style={{
                                cursor: isDragging ? "grabbing" : "grab",
                                opacity: isCursorNearTop ? 1 : 0,
                                transition: "opacity 300ms ease",
                            }}
                            onMouseDown={handleDragBarMouseDown}
                        />
                    )}
                    <div
                        className="content-wrapper"
                        style={{
                            overflowY:
                                containerMode === ViewModes.EXPANDED && containerWidth < expandedWidth
                                    ? "auto"
                                    : "hidden",
                            opacity: containerMode === ViewModes.CLOSED ? 0 : 1,
                            transition: "opacity 0.3s ease-in-out 0.1s",
                            overflowX: "hidden",
                            height: containerMode === ViewModes.CLOSED ? 0 : computedHeight - 15,
                        }}
                    >
                        {containerMode === ViewModes.SMALL && progress < threshold && (
                            <div className="small-content">
                                <div className="small-header">
                            <span className="small-time">
                                <LatestMessageInfo messages={messagesData} />
                            </span>
                                    <button className="small-add-btn" onClick={() => setProgress(1)}>
                                        +
                                    </button>
                                </div>
                                <div className="small-footer">
                                    <div className={`reflections-icon ${allRead ? "all-read" : ""}`}>
                                        <ReflectionIcon />
                                    </div>
                                    <span className="small-title">Reflections</span>
                                    <div className="small-count">{messagesData.length}</div>
                                </div>
                            </div>
                        )}

                        {progress >= threshold && (
                            <div className="expanded-content">
                                <div className="expanded-content-container">
                                    <div className="reflections-header">
                                        <div className="reflections-title">
                                            <ReflectionIcon />
                                            <span className="expand-title">Reflections</span>
                                        </div>
                                        <div className="message-toggle-and-search">
                                            <div className="message-toggle">
                                                <div
                                                    className="toggle-ball"
                                                    style={{ left: messageFilter === "code" ? "2px" : "24px" }}
                                                />
                                                <div
                                                    className={
                                                        messageFilter === "code"
                                                            ? "toggle-bot-message-active-icon"
                                                            : "toggle-bot-message-icon"
                                                    }
                                                    onClick={() => handleToggleFilter("code")}
                                                >
                                                    <StarsIcon height={17} width={13} />
                                                </div>
                                                <div
                                                    className={
                                                        messageFilter === "user"
                                                            ? "toggle-user-message-active-icon"
                                                            : "toggle-user-message-icon"
                                                    }
                                                    onClick={() => handleToggleFilter("user")}
                                                >
                                                    <UserMessageIcon />
                                                </div>
                                            </div>
                                            <div
                                                className={`search-container ${isSearchVisible ? "search-visible" : ""}`}>
                                                <div
                                                    className="search-icon"
                                                    onClick={() => setIsSearchVisible((prev) => !prev)}
                                                >
                                                    <SearchIcon />
                                                </div>
                                                <CSSTransition
                                                    in={isSearchVisible}
                                                    timeout={300}
                                                    classNames="search-input"
                                                    unmountOnExit
                                                >
                                                    <div className="search-input-container">
                                                        <input
                                                            type="text"
                                                            className="search-input"
                                                            placeholder="Search..."
                                                            autoFocus
                                                        />
                                                        <div
                                                            className="search-input-close"
                                                            onClick={() => setIsSearchVisible(false)}
                                                        >
                                                            <CloseSearchInputIcon />
                                                        </div>
                                                    </div>
                                                </CSSTransition>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pinned-messages">
                                        <div className="pinned-header">
                                            <div className="pinned">
                                                <div
                                                    className={`straight-pin-icon ${isPinnedListVisible ? "active-pin" : ""}`}>
                                                    <StraightPin fill="currentColor" />
                                                </div>
                                                <div>Pinned</div>
                                            </div>
                                            <div className="add-message-container">
                                                <div
                                                    className={`message-count ${pinnedMessages.length < 1 ? "display-none" : ""}`}>
                                                    {pinnedMessages.length}
                                                </div>
                                                <div
                                                    className="show-pined-btn"
                                                    onClick={() => {
                                                        if (pinnedMessages.length < 1) return;
                                                        setPinnedListVisible((prev) => !prev);
                                                    }}
                                                >
                                                    {pinnedMessages.length < 1 ? "+" : isPinnedListVisible ? "-" : "+"}
                                                </div>
                                            </div>
                                        </div>
                                        <CSSTransition
                                            in={isPinnedListVisible}
                                            timeout={300}
                                            classNames="message-list"
                                            unmountOnExit
                                        >
                                            <div className="pinned-messages-list">
                                                {pinnedMessages.map((message) => (
                                                    <ReflectionsMessageItem
                                                        key={message.id}
                                                        message={message}
                                                        onTogglePinned={handleTogglePinned}
                                                    />
                                                ))}
                                            </div>
                                        </CSSTransition>
                                    </div>

                                    <div className="messages">
                                        {finalSortedMessages.map(({ day, messages }) => (
                                            <MessagesOfDayList
                                                key={day}
                                                date={day}
                                                messages={messages}
                                                onTogglePinned={handleTogglePinned}
                                                onMarkAsRead={handleMarkAsRead}
                                            />
                                        ))}
                                    </div>

                                    <div>
                                        <CSSTransition
                                            in={isAddingMessage}
                                            timeout={300}
                                            classNames="input-panel"
                                            unmountOnExit
                                        >
                                            <div ref={messageInputRef} className="message-input-panel">
                                                <input
                                                    className="add-message-input"
                                                    type="text"
                                                    placeholder="Write down anything..."
                                                    autoFocus
                                                />
                                                <div
                                                    onClick={() => setIsAddingMessage(false)}
                                                    className="send-reflections-message-icon"
                                                >
                                                    <ArrowUpReflectionsIcon />
                                                </div>
                                            </div>
                                        </CSSTransition>
                                        {!isAddingMessage && (
                                            <button
                                                className="add-message-button"
                                                onClick={() => setIsAddingMessage(true)}
                                            >
                                                +
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
