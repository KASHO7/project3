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
        const month = this.date.getMonth();
        const year = this.date.getFullYear();
        const day = this.date.getDate();
        const lastDay = new Date(year, month + 1, 0);
        const fistDay = new Date(year, month, 1);
        const daysInMonth = lastDay.getDate();
        const fistDayOfWeek = fistDay.getDay();

    
        div.innerHTML = '';
        const datePickerDiv = document.createElement('div');
        datePickerDiv.className="date-picker";
        div.appendChild(datePickerDiv);

        const headerDiv = document.createElement('div');
        headerDiv.className='header';
        div.appendChild(headerDiv);

        const prevMonthDiv = document.createElement('button');
        prevMonthDiv.className='prev-month';
        prevMonthDiv.innerHTML='&#9665';
        prevMonthDiv.addEventListener('click',()=>this.prevMonth());
        headerDiv.appendChild(prevMonthDiv);

        const currentMonthDiv = document.createElement('div');
        currentMonthDiv.className='current-name';
        currentMonthDiv.innerText=`${this.getMonthName()} ${this.year}`;
        headerDiv.appendChild(currentMonthDiv);

    }
    getMonthName(month){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }
    
}
