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

    }
    getMonthName(month){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemper', 'October', 'November', 'December'];
        return months[month];
    }
    
}
