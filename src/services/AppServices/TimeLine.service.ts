import DateTimeService from './DateTime.service';

const TimeLineService = {
  configRoutes: (locationData: any[]) => {
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    };
    console.log('configRoutes', locationData);

    let milestone = {};
    locationData.map((item, index) => {
      const date = item.date.toLocaleDateString('vi-VN', options);
      // if has date > push item

      const time = DateTimeService.getTimeFromDate(item.time);

      const convertTime = { ...item, time };
      if (milestone[date]) {
        milestone[date].locations.push(convertTime);
      } else {
        milestone = {
          ...milestone,
          [date]: {
            key: index,
            tabTitle: date,
            locations: [],
          },
        };
        milestone[date].locations.push(convertTime);
      }
    });

    return milestone;
  },
};

export default TimeLineService;
