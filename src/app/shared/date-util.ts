import * as moment from 'moment';

import { environment } from 'src/environments/environment';

export class DateUtil {
  static getDateFormat(date: string) {
    switch (true) {
      case environment.validatorPatterns['dateTime'].pattern.US.test(date):
        return 'YYYY-MM-DD HH:mm:ss';

      case environment.validatorPatterns['dateTime'].pattern.BR.test(date):
        return 'DD/MM/YYYY HH:mm:ss';

      case environment.validatorPatterns[
        'dateTime'
      ].pattern.conventionalBR.test(date):
        return 'DD/MM/YYYY HH:mm:ss';

      case environment.validatorPatterns['date'].pattern.US.test(date):
        return 'YYYY-MM-DD';

      case environment.validatorPatterns['date'].pattern.BR.test(date):
        return 'DD-MM-YYYY';
    }

    return 'DD/MM/YYYY';
  }

  static formatDateToAPI(date: string) {
    if (!date) {
      return null;
    }

    const format = DateUtil.getDateFormat(date);

    if (format.length > 10) {
      return moment(date, format).format('YYYY-MM-DD HH:mm:ss');
    }

    return moment(date, format).format('YYYY-MM-DD');
  }
}
