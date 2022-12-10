import { DropdownModel } from './common.model';

export type TripModel = {
  id: string;
  type: string;
  banner: string;
  name: string;
  leader: string;
  linkInvite: string;
  deposit: string;
  locations: TimeLineModel[];
  province: DropdownModel;
  createAt: Date;
  transport: {
    vehicle: DropdownModel;
    depart: {
      date: Date;
      time: Date;
      locate: string;
    };
    return: {
      date: Date;
      time: Date;
      locate: string;
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
