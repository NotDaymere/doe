import React, { useState } from "react";
import AroundClockIcon from "src/shared/icons/AroundClock.icon";
import LeftIcon from "src/shared/icons/Left.icon";
import RightIcon from "src/shared/icons/Right.icon";
import classNames from "classnames";
import { ISession } from "../TimeSpan";
import css from "./Calendar.module.less";

interface IProps {
    sessions: ISession[];
    onDateSelect: (date: Date) => void;
    onSessionSelect: (sessions: ISession[]) => void;
}

const SESSIONS: ISession[] = [
    { id: "0_time", time: "9:41 AM" },
    { id: "1_time", time: "10:41 AM" },
];

const DAYS_IN_CALENDAR = 35;

const Calendar: React.FC<IProps> = ({ sessions, onDateSelect, onSessionSelect }) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const getCurrentMonth = (date: Date) => {
        const formattedMonth = date.toLocaleDateString("en-US", {
            month: "long",
        });
        const formattedYear = date.toLocaleDateString("en-US", {
            year: "2-digit",
        });
        return formattedMonth + " '" + formattedYear;
    };

    const daysOfWeek: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    const daysInMonth: number = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth: number = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const daysInPrevMonth: number = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
    ).getDate();

    const getDaysArray = (): (Date | null)[] => {
        const daysArray: (Date | null)[] = [];
        const prevMonthDays: number = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        const nextMonthDays: number = DAYS_IN_CALENDAR - prevMonthDays - daysInMonth; // 42 - загальна кількість комірок календаря

        for (let i = prevMonthDays; i > 0; i--) {
            daysArray.push(
                new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    daysInPrevMonth - i + 1
                )
            );
        }

        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }

        for (let i = 1; i <= nextMonthDays; i++) {
            daysArray.push(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i));
        }

        return daysArray;
    };

    const handlePrevButtonClick = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        onSessionSelect([]);
    };

    const handleNextButtonClick = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        onSessionSelect([]);
    };

    const handleDayClick = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            onSessionSelect([]);
            onDateSelect(date);
        }
    };

    return (
        <div className={css.calendarContainer}>
            <div className={css.calendarHeader}>
                <button className={css.button} onClick={handlePrevButtonClick}>
                    <LeftIcon width={6} height={10} />
                </button>
                <span>{getCurrentMonth(currentDate)}</span>
                <button className={css.button} onClick={handleNextButtonClick}>
                    <RightIcon width={6} height={10} />
                </button>
            </div>
            <div className={css.calendarGrid}>
                {daysOfWeek.map((day) => (
                    <div key={day} className={css.dayHeader}>
                        {day}
                    </div>
                ))}
                {getDaysArray().map((date, index) => (
                    <div
                        key={index}
                        className={classNames(css.day, {
                            [css.otherMonth]:
                                date?.getMonth() !== currentDate.getMonth() ||
                                date?.getDay() === 0 ||
                                date?.getDay() === 6,
                            [css.selected]:
                                date?.getDate() === selectedDate?.getDate() &&
                                date?.getMonth() === selectedDate?.getMonth(),
                        })}
                        onClick={() => handleDayClick(date)}
                    >
                        {date?.getDate()}
                    </div>
                ))}
            </div>
            <div className={css.calendarFooter}>
                <div className={css.sessionsWrapper}>
                    <div className={css.sessionsInfo}>
                        <div className={css.aroundClockIcon}>
                            <AroundClockIcon width={14} height={12} />
                        </div>
                        <span className={css.bold}>{SESSIONS.length} sessions&nbsp;</span>
                        <span>found:</span>
                    </div>
                    <button
                        className={css.selectAllSessions}
                        onClick={() => onSessionSelect([...SESSIONS])}
                    >
                        Select all
                    </button>
                </div>
                <div className={css.sessions}>
                    {SESSIONS.map((session) => (
                        <div
                            key={session.id}
                            className={classNames(css.session, {
                                [css.sessionSelected]: sessions.includes(session),
                            })}
                            onClick={() => onSessionSelect((prevArray) => [...prevArray, session])}
                        >
                            {session.time}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
