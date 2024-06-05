import { Component, ElementRef, ViewChild } from '@angular/core';

import { LoadingController, Platform } from '@ionic/angular';

import * as moment from 'moment';

import { DateUtil } from 'src/app/shared';

import { themeColors } from 'src/theme/colors';

import { dateTraining, highlightedDate } from 'src/app/interfaces';

@Component({
  selector: 'app-calendar-page',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss'],
})
export class CalendarPage {
  public selectedDate: string | null;
  public welcomeMessage: string;
  public dateTranings: dateTraining[] = [];

  public highlightedDates: highlightedDate[] = [];
  public showAddTrainingButton: boolean = false;
  public showTrainingsButton: boolean = false;

  @ViewChild('datetime', { read: ElementRef }) datetime!: ElementRef;

  constructor(
    public platform: Platform,
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

    this.loadTrainings();
  }

  ngAfterViewInit() {
    document.addEventListener('click', (event) => {
      setTimeout(() => {
        const shadowRoot = this.datetime.nativeElement.shadowRoot;
        const monthToogleIsOpened = shadowRoot.querySelector(
          `[aria-label="Hide year picker"]`
        );

        if (monthToogleIsOpened) {
          this.showAddTrainingButton = false;
          this.showTrainingsButton = false;
        } else if (this.selectedDate) {
          this.toggleTrainingsButton(this.selectedDate);
        }
      }, 50);
    });
  }

  ngAfterViewChecked() {
    if (this.datetime) {
      const shadowRoot = this.datetime.nativeElement.shadowRoot;
      const dateTimeHeaderDiv = shadowRoot.querySelector('.datetime-header');

      dateTimeHeaderDiv?.setAttribute('style', 'background-color: #0054e9e0');

      if (this.platform.is('ios')) {
        const calendarBody = shadowRoot.querySelector('.calendar-body');

        dateTimeHeaderDiv?.setAttribute('style', 'color: #666666');

        calendarBody?.setAttribute('style', 'min-height: 300px');
      }
    }
  }

  private loadTrainings() {
    //TODO: get dateTranings from local storage
    this.dateTranings = [
      {
        date: '2024-06-03',
        fullDate: 'segunda-feira, 3 de junho',
        trainings: [
          {
            type: 'Costas',
            status: false,
          },
        ],
      },
      {
        date: '2024-06-04',
        fullDate: 'terça-feira, 4 de junho',
        trainings: [
          {
            type: 'Bíceps',
            status: true,
          },
        ],
      },
      {
        date: '2024-06-05',
        fullDate: 'quarta-feira, 5 de junho',
        trainings: [
          {
            type: 'Peito',
            status: false,
          },
        ],
      },
    ];

    this.highlightedDates = [];

    this.dateTranings.forEach((dateTraining) => {
      if (dateTraining.trainings.length) {
        let textColor = '';
        let backgroundColor = '';

        const expiredDate = this.checkValidityDate(dateTraining.date);
        const pendingTraining = dateTraining.trainings.find(
          (training) => !training.status
        );

        switch (true) {
          case expiredDate === 'expired' && !!pendingTraining:
            textColor = themeColors.highlightedDateColors.dangerTextColor;
            backgroundColor =
              themeColors.highlightedDateColors.dangerbackgroundColor;
            break;

          case expiredDate === 'expired' && !pendingTraining:
            textColor = themeColors.highlightedDateColors.successTextColor;
            backgroundColor =
              themeColors.highlightedDateColors.successBackgroundColor;
            break;

          case expiredDate === 'today' && !!pendingTraining:
            textColor = themeColors.highlightedDateColors.warningTextColor;
            backgroundColor =
              themeColors.highlightedDateColors.warningBackgroundColor;
            break;

          case expiredDate === 'today' && !pendingTraining:
            textColor = themeColors.highlightedDateColors.successTextColor;
            backgroundColor =
              themeColors.highlightedDateColors.successBackgroundColor;
            break;

          default:
            textColor = themeColors.highlightedDateColors.warningTextColor;
            backgroundColor =
              themeColors.highlightedDateColors.warningBackgroundColor;
            break;
        }

        const highlightedDate: highlightedDate = {
          date: dateTraining.date,
          textColor,
          backgroundColor,
        };

        this.highlightedDates.push(highlightedDate);
      }
    });

    const todayTrainings = this.dateTranings.find(
      (dateTraning) =>
        dateTraning.date === today && dateTraning.trainings.length
    );

    if (todayTrainings) {
      this.showTrainingsButton = true;
    } else {
      this.showAddTrainingButton = true;
    }
  }

  public onSelectDate(event: any) {
    const date = moment(event.target.value).format('YYYY-MM-DD');

    this.selectedDate = date;

    this.toggleTrainingsButton(date);
  }

  private toggleTrainingsButton(date: string) {
    const dateTraningSelected = this.dateTranings.find(
      (dateTraning) => dateTraning.date === date
    );

    if (dateTraningSelected) {
      this.showTrainingsButton = true;
      this.showAddTrainingButton = false;
    } else {
      this.showAddTrainingButton = true;
      this.showTrainingsButton = false;
    }
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
