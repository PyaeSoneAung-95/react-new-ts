import { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { range, getMonth, getYear, months } from "../../utils/date.js";

export default function DatePickerHeader({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) {
  const years = range(1990, getYear(new Date()) + 1, 1);
  return (
    <div className="w-full flex bg-white p-3 gap-6">
      <button
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        {"<"}
      </button>
      <div className="flex-1">
        <select
          value={getYear(date)}
          onChange={({ target: { value } }) => changeYear(parseInt(value))}
        >
          {years.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={months[getMonth(date)]}
          onChange={({ target: { value } }) => {
            changeMonth(months.indexOf(value));
          }}
        >
          {months.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        {">"}
      </button>
    </div>
  );
}
