import * as React from "react";
import {
  Calendar,
  DateRangeType,
  DayOfWeek,
  DefaultButton,
  mergeStyleSets,
  defaultCalendarStrings,
  addDays,
  getDateRangeArray,
} from "@fluentui/react";

const styles = mergeStyleSets({
  wrapper: { height: 360 },
  button: { margin: "17px 10px 0 0" },
});
const dateRangeType = DateRangeType.Month;
const firstDayOfWeek = DayOfWeek.Sunday;

export const CalendarInlineMonthSelectionExample: React.FunctionComponent =
  () => {
    const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
    const [selectedDate, setSelectedDate] = React.useState<Date>();

    const onSelectDate = React.useCallback(
      (date: Date, selectedDateRangeArray?: Date[]): void => {
        setSelectedDate(date);
        setSelectedDateRange(selectedDateRangeArray);
      },
      []
    );

    const goPrevious = React.useCallback((): void => {
      setSelectedDate((prevSelectedDate) => {
        prevSelectedDate = prevSelectedDate || new Date();
        const dateRangeArray = getDateRangeArray(
          prevSelectedDate,
          dateRangeType,
          firstDayOfWeek
        );

        const subtractFrom = new Date(
          dateRangeArray[0].getFullYear(),
          dateRangeArray[0].getMonth(),
          1
        );
        const daysToSubtract = 1;

        return addDays(subtractFrom, -daysToSubtract);
      });
    }, []);

    const goNext = React.useCallback((): void => {
      setSelectedDate((prevSelectedDate) => {
        prevSelectedDate = prevSelectedDate || new Date();
        const dateRangeArray = getDateRangeArray(
          prevSelectedDate,
          dateRangeType,
          firstDayOfWeek
        );
        return addDays(dateRangeArray.pop()!, 1);
      });
    }, []);

    let dateRangeString = "Not set";
    if (selectedDateRange) {
      const rangeStart = selectedDateRange[0];
      const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
      dateRangeString =
        rangeStart.toLocaleDateString() + "-" + rangeEnd.toLocaleDateString();
    }

    return (
      <div className={styles.wrapper}>
        <div>Selected date: {selectedDate?.toLocaleString() || "Not set"}</div>
        <div>Selected range: {dateRangeString}</div>

        <Calendar
          dateRangeType={dateRangeType}
          highlightSelectedMonth
          showGoToToday
          onSelectDate={onSelectDate}
          value={selectedDate}
          firstDayOfWeek={firstDayOfWeek}
          // Calendar uses English strings by default. For localized apps, you must override this prop.
          strings={defaultCalendarStrings}
        />
        <div>
          <DefaultButton
            className={styles.button}
            onClick={goPrevious}
            text="Previous"
          />
          <DefaultButton
            className={styles.button}
            onClick={goNext}
            text="Next"
          />
        </div>
      </div>
    );
  };
