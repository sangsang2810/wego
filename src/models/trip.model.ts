export type TripModel = {
  banner: string;
  name: string;
  leader: string;
  linkInvite: string;
  deposit: string;
  locations: TimeLineModel[];
  transport: {
    vehicle: 'motorBike' | 'flight' | 'bus' | '';
    start: {
      date: Date;
      from: Date;
      to: Date;
    };
    end: {
      date: Date;
      from: Date;
      to: Date;
    };
  };
};

export type TimeLineModel = {
  time: any;
  date: any;
  title: string;
  address: string;
  note: string;
};
