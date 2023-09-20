'use strict';
class DatePicker{
    constructor(id, callBack) {
    this.id = id;
    this.callBack = callBack;
    this.date = new Date();
    }
    render(date){
        const div = document.getElementById(this.id);
        if(!div){
            console.error(`No element with id ${this.id} found`);
        }
    }
}