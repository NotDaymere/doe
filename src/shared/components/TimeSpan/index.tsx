import { useState } from "react";
import Calendar from "../Calendar";
import CalendarIcon from "src/shared/icons/Calendar.icon";
import css from "./TimeSpan.module.less";
import DownIcon from "src/shared/icons/Down.icon";
import classNames from "classnames";

export interface ISession {
    id: string;
    time: string;
}

const TimeSpan = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSession, setSelectedSession] = useState<ISession[]>([]);

    const getDaySuffix = (day: string) => {
        switch (day) {
            case "1":
                return "st";
            case "2":
                return "nd";
            case "3":
                return "rd";
            default:
                return "th";
        }
    };

    const formatSelectedDate = (date: Date) => {
        const formattedDay = date.toLocaleDateString("en-US", {
            day: "numeric",
        });
        const formattedMonth = date.toLocaleDateString("en-US", {
            month: "long",
        });
        const formattedYear = date.toLocaleDateString("en-US", {
            year: "2-digit",
        });
        return (
            formattedDay + getDaySuffix(formattedDay) + " " + formattedMonth + " '" + formattedYear
        );
    };

    const handleToggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <div className={css.timeSpanContainer}>
            {!selectedDate ? (
                <button className={css.timeSpanButton} onClick={handleToggleCalendar}>
                    <CalendarIcon width={15} height={14} />
                    <span className={css.text}>Time Span</span>
                    <div
                        className={classNames(css.arrowIcon, {
                            [css.arrowIconRotated]: isCalendarOpen,
                        })}
                    >
                        <DownIcon width={10} height={6} />
                    </div>
                </button>
            ) : (
                <div className={css.selectedDateWrapper}>
                    <div className={css.selectedDate}>
                        <CalendarIcon width={15} height={14} />
                        <span>{formatSelectedDate(selectedDate)}</span>
                        <span>{selectedSession?.[0]?.time}</span>
                    </div>

                    <button
                        onClick={handleToggleCalendar}
                        className={classNames(css.toggleCalendar, {
                            [css.arrowIconRotated]: isCalendarOpen,
                        })}
                    >
                        <DownIcon width={10} height={6} />
                    </button>
                </div>
            )}
            {isCalendarOpen && (
                <div className={css.calendar}>
                    <Calendar
                        onDateSelect={handleDateSelect}
                        onSessionSelect={setSelectedSession}
                        sessions={selectedSession}
                    />
                </div>
            )}
        </div>
    );
};

export default TimeSpan;
