"use strict";

class DatePicker {
  constructor(id, callBack) {
    this.id = id;
    this.callBack = callBack;
    this.date = new Date();
  }

  render(date) {
    const div = document.getElementById(this.id);

    if (!div) {
      console.error(`Element with id ${this.id} not found`);
      return;
    }
    this.date = date;

    const month = date.getMonth();
    const year = date.getFullYear();
    const lastDay = new Date(year, month + 1, 0);
    const firstDay = new Date(year, month, 1);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();

    const calendar = this.generateCalendar(
      year,
      month,
      daysInMonth,
      firstDayOfWeek
    );
    const monthName = this.getMonthName(month);

    div.innerHTML = "";
    const datePickerDiv = document.createElement("div");
    datePickerDiv.className = "date-picker";
    div.appendChild(datePickerDiv);

    const headerDiv = document.createElement("div");
    headerDiv.className = "header";
    datePickerDiv.appendChild(headerDiv);

    const prevMonthButton = document.createElement("button");
    prevMonthButton.className = "prev-month";
    prevMonthButton.innerHTML = "&#9665";
    prevMonthButton.addEventListener("click", () => this.prevMonth());
    headerDiv.appendChild(prevMonthButton);

    const currentMonth = document.createElement("div");
    currentMonth.className = "current-name";
    currentMonth.innerText = `${monthName} ${year}`;
    headerDiv.appendChild(currentMonth);

    const nextMonthButton = document.createElement("button");
    nextMonthButton.className = "next-month";
    nextMonthButton.innerHTML = "&#9655";
    nextMonthButton.addEventListener("click", () => this.nextMonth());
    headerDiv.appendChild(nextMonthButton);

    const table = document.createElement("table");
    datePickerDiv.appendChild(table);

    const thead = document.createElement("thead");
    table.appendChild(thead);

    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Create a row for the weekdays at the top of the calendar
    const weekdayRow = document.createElement("tr");
    weekdays.forEach((day) => {
      const th = document.createElement("th");
      th.innerText = day;
      weekdayRow.appendChild(th);
    });
    thead.appendChild(weekdayRow);

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    for (let i = 0; i < calendar.length; i++) {
      const week = calendar[i];
      const weekrow = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        const day = week[j];
        const td = document.createElement("td");
        td.innerText = day !== "" ? day : " "; // Display empty cells as spaces
        if (day === "") {
          td.classList.add("dimmed-day"); // Add a class to dim empty cells
        }
        weekrow.appendChild(td);
      }

      tbody.appendChild(weekrow);
    }
  }

  prevMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.render(this.date);
  }

  nextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.render(this.date);
  }

  getMonthName(month) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  }

  generateCalendar(year, month, daysInMonth, firstDayOfWeek) {
    const calendar = [];
    let dayOfWeek = firstDayOfWeek;
    let dayOfMonth = 1;
    let week = 0;

    while (dayOfMonth <= daysInMonth) {
      calendar[week] = [];

      if (week === 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          calendar[week][i] = "";
        }
      }

      while (dayOfWeek < 7 && dayOfMonth <= daysInMonth) {
        calendar[week][dayOfWeek] = dayOfMonth;
        dayOfWeek++;
        dayOfMonth++;
      }

      dayOfWeek = 0;
      week++;
    }

    while (calendar[week - 1].length < 7) {
      calendar[week - 1].push("");
    }

    return calendar;
  }

  handleDayClick(dayCell) {
    const selectedDay = parseInt(dayCell.innerText);
    const selectedMonth = this.date.getMonth() + 1;
    const selectedYear = this.date.getFullYear();

    this.callBack(this.id, {
      month: selectedMonth,
      day: selectedDay,
      year: selectedYear,
    });
  }
}
