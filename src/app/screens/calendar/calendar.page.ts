import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-page',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss'],
})
export class CalendarPage {
  constructor() {}

  public onSelectDate(event: any) {
    console.log(event.detail);
  }
}
