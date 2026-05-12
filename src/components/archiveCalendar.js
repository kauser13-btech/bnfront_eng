"use client"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ArchiveCalendar = () => {

    const handleArchive = (getDate) => {
        var date = new Date(getDate);
        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });
        window.location.href = `/archive/${year}-${month}-${day}`;
    };

    return (
        <DatePicker inline peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" onChange={(d) => { handleArchive(d) }} minDate={new Date('01/01/2010')} maxDate={new Date()} />
    )
}

export default ArchiveCalendar