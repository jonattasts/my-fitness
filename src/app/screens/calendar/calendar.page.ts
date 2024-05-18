import { Component, ElementRef, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-calendar-page',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss'],
})
export class CalendarPage {
  @ViewChild('datetime', { read: ElementRef }) datetime!: ElementRef;

  constructor(private platform: Platform) {}

  public onSelectDate(event: any) {
    console.log(event.detail);
  }

  ngAfterViewChecked() {
    if (this.datetime) {
      const shadowRoot = this.datetime.nativeElement.shadowRoot;
      const dateTimeHeaderDiv = shadowRoot.querySelector('.datetime-header');

      dateTimeHeaderDiv?.setAttribute('style', 'background-color: #0054e9e0');

      if (this.platform.is('ios')) {
        dateTimeHeaderDiv?.setAttribute('style', 'color: #666666');
      }
    }
  }
}
