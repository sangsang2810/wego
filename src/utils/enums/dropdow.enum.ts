import { DropdownModel } from 'models';
import AIRPORT from './airport.enum';
import ASSETS_ENUM from './assets.enum';

const VEHICLE_DDL_DATA: DropdownModel[] = [
  {
    label: 'Máy bay',
    value: 'FL',
    image: {
      uri: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_PLANE,
    },
  },
  { label: 'Xe máy', value: 'BI', image: { uri: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_MOTOR } },
  { label: 'Xe lửa', value: 'TR', image: { uri: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_TRAIN } },
  { label: 'Tàu thủy', value: 'SH', image: { uri: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_SHIP } },
  { label: 'Xe bus', value: 'BU', image: { uri: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_BUS } },
];

const AIRPORT_DDL_DATA: DropdownModel[] = AIRPORT.map(({ shortName, code }) => {
  return {
    label: shortName,
    value: code,
  };
});

const DROPDOWN_ENUM = {
  VEHICLE_DDL_DATA,
  AIRPORT_DDL_DATA,
};

export default DROPDOWN_ENUM;
