const DateTimeService = {
  analyzeDate: (date: Date, getType: 'date' | 'month' | 'year' | 'hour' | 'minute') => {
    let result;
    switch (getType) {
      case 'date':
        break;

      default:
        break;
    }
  },

  combineTripDateTime: (date1: Date, date2: Date) => {
    // date1: get date/month/year
    // date2: get hour/minute
    const day = date1.getDate();
    const month = date1.getMonth() + 1;
    const year = date1.getFullYear();
    const hour = date2.getHours() + 1;
    const minute = date2.getMinutes() + 1;
    const timeString = hour + ':' + minute + ':00';

    const dateString = '' + year + '-' + month + '-' + day;
    const combined = new Date(dateString + ' ' + timeString);

    return combined;
  },

  getTimeFromDate: (date: Date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const combined = `${hour}:${minute}`;
    return combined;
  },
};

export default DateTimeService;
