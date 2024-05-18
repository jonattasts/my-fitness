import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendar-page',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss'],
})
export class CalendarPage {
  @ViewChild('datetime', { read: ElementRef }) datetime!: ElementRef;

  constructor() {}

  public onSelectDate(event: any) {
    console.log(event.detail);
  }

  ngAfterViewChecked() {
    if (this.datetime) {
      const shadowRoot = this.datetime.nativeElement.shadowRoot;
      const dateTimeHeaderDiv = shadowRoot.querySelector('.datetime-header');

      dateTimeHeaderDiv?.setAttribute('style', 'background-color: #0054e9e0');
    }
  }
}
