//@ts-ignore
import { CalendarContainer } from "react-datepicker";

export default function DatePickerContainer({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <CalendarContainer
      className={`${className} border border-gray-200 shadow-md w-[400px] rounded-none`}
    >
      {children}
    </CalendarContainer>
  );
}
