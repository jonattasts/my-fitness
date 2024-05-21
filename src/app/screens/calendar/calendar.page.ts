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
  public highlightedDates = [
    {
      date: '2024-05-20',
      textColor: '#ad000dd9',
      backgroundColor: '#f3afb4',
    },
    {
      date: '2024-05-21',
      textColor: '#09721b',
      backgroundColor: '#c8e5d0',
    },
    {
      date: '2024-05-22',
      textColor: '#846501fc',
      backgroundColor: '#edd690',
    },
  ];

  @ViewChild('datetime', { read: ElementRef }) datetime!: ElementRef;

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController
  ) {}

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

      const datesTraining = [
        {
          day: '20',
          month: '05',
          year: '2024',
          date: '2024-05-20',
          fullDate: 'segunda-feira, 20 de maio',
          training: { status: false },
        },
        {
          day: '21',
          month: '05',
          year: '2024',
          date: '2024-05-21',
          fullDate: 'terça-feira, 21 de maio',
          training: { status: true },
        },
        {
          day: '22',
          month: '05',
          year: '2024',
          date: '2024-05-22',
          fullDate: 'quarta-feira, 22 de maio',
          training: { status: false },
        },
      ];

      datesTraining.forEach((dateTraining) => {
        const ariaLabel =
          dateTraining.date === moment().format('YYYY-MM-DD')
            ? `Today, ${dateTraining.fullDate}`
            : dateTraining.fullDate;

        if (shadowRoot.querySelector(`[aria-label="${ariaLabel}"]`)) {
          switch (true) {
            case this.checkValidityDate(dateTraining.date) === 'expired' &&
              !dateTraining.training.status:
              shadowRoot
                .querySelector(`[aria-label="${ariaLabel}"]`)
                .setAttribute('part', 'calendar-day date-danger');
              break;

            case this.checkValidityDate(dateTraining.date) === 'expired' &&
              dateTraining.training.status:
              shadowRoot
                .querySelector(`[aria-label="${ariaLabel}"]`)
                .setAttribute('part', 'calendar-day date-success');
              break;

            case this.checkValidityDate(dateTraining.date) === 'today' &&
              !dateTraining.training.status:
              shadowRoot
                .querySelector(`[aria-label="${ariaLabel}"]`)
                .setAttribute('part', 'calendar-day today date-warning');
              break;

            case this.checkValidityDate(dateTraining.date) === 'today' &&
              dateTraining.training.status:
              shadowRoot
                .querySelector(`[aria-label="${ariaLabel}"]`)
                .setAttribute('part', 'calendar-day today date-success');
              break;

            case this.checkValidityDate(dateTraining.date) === 'pendig' &&
              !dateTraining.training.status:
              shadowRoot
                .querySelector(`[aria-label="${ariaLabel}"]`)
                .setAttribute('part', 'calendar-day date-warning');
              break;
          }
        }
      });
    }
  }

  public onSelectDate(event: any) {
    console.log(event.detail);

    console.log(event);
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
}
