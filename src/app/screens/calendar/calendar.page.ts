import { Component, ElementRef, ViewChild } from '@angular/core';

import { LoadingController, Platform } from '@ionic/angular';

import * as moment from 'moment';

import { DateUtil } from 'src/app/shared';

@Component({
  selector: 'app-calendar-page',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss'],
})
export class CalendarPage {
  public selectedDate: string;
  public welcomeMessage: string;

  public highlightedDates = [
    {
      date: '2024-06-03',
      textColor: '#ad000dd9',
      backgroundColor: '#f3afb4',
    },
    {
      date: '2024-06-04',
      textColor: '#09721b',
      backgroundColor: '#c8e5d0',
    },
    {
      date: '2024-06-05',
      textColor: '#846501fc',
      backgroundColor: '#edd690',
    },
    {
      date: '2024-07-05',
      textColor: '#846501fc',
      backgroundColor: '#edd690',
    },
  ];

  @ViewChild('datetime', { read: ElementRef }) datetime!: ElementRef;

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    let weather = '';
    const userName = 'Jhon';

    const time = moment().hours();

    switch (true) {
      case time < 18:
        weather = '🌞';
        break;

      default:
        weather = '🌚';
        break;
    }

    this.welcomeMessage = `${userName}! ${weather}`;
  }

  async ionViewDidEnter() {
    const loading = await this.loadingCtrl.create({
      message: '',
      spinner: 'bubbles',
      duration: 2000,
      cssClass: 'animation-background-transparent',
    });

    loading.present();
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

  public onSelectDate(event: any) {
    const date = moment(event.target.value).format('YYYY-MM-DD');

    this.selectedDate = date;
  }

  private checkValidityDate(date: string, show = false) {
    const format = DateUtil.getDateFormat(date);

    const today = moment();

    const diff = moment(date, format).diff(moment(today, format));

    const days = moment.duration(diff).asDays().toFixed(1);

    switch (true) {
      case !(days.indexOf('-0') > -1) && days.indexOf('-') > -1:
        return 'expired';

      case days.indexOf('-0') > -1:
        return 'today';

      default:
        return 'pendig';
    }
  }

  public addTraining() {
    console.log('addTraining to', this.selectedDate);
  }

  public showTrainings() {
    console.log('seeTrainings from', this.selectedDate);
  }
}
