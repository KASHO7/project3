'use strict';
class DatePicker{
    constructor(id, callBack) {
        this.id = id;
        this.callBack = callBack;
        this.date = new Date();
    }
    render(date){
        const div = document.getElementById(this.id);
        this.date = date;
        if(!div){
            console.error(`Element with id ${this.id} not found`);
        }
        const month = this.date.getMonth();
        const year = this.date.getFullYear();
        const day = this.date.getDate();
        const lastDay = new Date(year, month + 1, 0);
        const fistDay = new Date(year, month, 1);
        const daysInMonth = lastDay.getDate();
        const fistDayOfWeek = fistDay.getDay();

        const calendar = this.generateCalendar(year, month, day, daysInMonth, fistDayOfWeek);
        const monthName = this.getMonthName(month);

    
        div.innerHTML = '';
        const datePickerDiv = document.createElement('div');
        datePickerDiv.className="date-picker";
        div.appendChild(datePickerDiv);

        const headerDiv = document.createElement('div');
        headerDiv.className='header';
        datePickerDiv.appendChild(headerDiv);

        const prevMonthDiv = document.createElement('button');
        prevMonthDiv.className='prev-month';
        prevMonthDiv.innerHTML='&#9665';
        prevMonthDiv.addEventListener('click',()=>this.prevMonth());
        headerDiv.appendChild(prevMonthDiv);

        const currentMonthDiv = document.createElement('div');
        currentMonthDiv.className = 'current-name';
        currentMonthDiv.innerText = `${monthName} ${year}`;
        headerDiv.appendChild(currentMonthDiv);


        const nextMonthDiv = document.createElement('button');
        nextMonthDiv.className='next-month';
        nextMonthDiv.innerHTML='&#9655';
        nextMonthDiv.addEventListener('click',()=>this.nextMonth());
        headerDiv.appendChild(nextMonthDiv);

        const table = document.createElement('table');
        datePickerDiv.appendChild(table);

        const thead = document.createElement('thead');
        table.appendChild(thead);

        const weekrow = document.createElement('tr');
        thead.appendChild(weekrow);

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for(let i = 0; i < days.length; i++){
            const th = document.createElement('th');
            th.innerText = days[i];
            weekdays.appendChild(th);
        }

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);

        tbody.innerHTML = calendar;

        const dayCells = tbody.querySelectorAll('td');
        for (let i = 0; i < dayCells.length; i++) {
            const dayCell = dayCells[i];
            if (!dayCell.classList.contains('dimmed-day')) {
                dayCell.addEventListener('click', () => this.handleDayClick(dayCell));
            }
        }

    }
    prevMonth(){
        this.date.setMonth(this.date.getMonth() - 1);
        this.render(this.date);

    }
    nextMonth(){
        this.date.setMonth(this.date.getMonth() + 1);
        this.render(this.date);
    }
    getMonthName(month){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }
    generateCalendar(){
        const month = this.date.getMonth();
        const year = this.date.getFullYear();
        const day = this.date.getDate();
        const lastDay = new Date(year, month + 1, 0);
        const fistDay = new Date(year, month, 1);
        const daysInMonth = lastDay.getDate();
        const fistDayOfWeek = fistDay.getDay();
        const lastDayOfWeek = lastDay.getDay();
        const calendar = [];
        let dayOfWeek = fistDayOfWeek;
        let dayOfMonth = 1;
        let week = 0;
        while(dayOfMonth <= daysInMonth){
            calendar[week] = [];
            if(week === 0){
                for(let i = 0; i < dayOfWeek; i++){
                    calendar[week][i] = '';
                }
            }
            while(dayOfWeek < 7){
                calendar[week][dayOfWeek] = dayOfMonth;
                dayOfWeek++;
                dayOfMonth++;
            }
            dayOfWeek = 0;
            week++;
        }
        return calendar;
    }
    handleDayClick(dayCell) {
        const selectedDay = parseInt(dayCell.innerText);
    const selectedMonth = this.selectedDate.getMonth() + 1;
    const selectedYear = this.selectedDate.getFullYear();

    this.callback(this.divId, {
      month: selectedMonth,
      day: selectedDay,
      year: selectedYear
    });
  }
      
}
