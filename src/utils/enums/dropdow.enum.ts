import { DropdownModel } from 'models';
import ASSETS_ENUM from './assets.enum';

const VEHICLE_DDL_DATA: DropdownModel[] = [
  {
    label: 'Máy bay',
    value: '0',
    image: {
      uri: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_PLANE,
    },
  },
  { label: 'Xe máy', value: '1', image: { uri: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_MOTOR } },
  { label: 'Xe lửa', value: '2', image: { uri: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_TRAIN } },
  { label: 'Tàu thủy', value: '3', image: { uri: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_SHIP } },
  { label: 'Xe Bus', value: '4', image: { uri: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_BUS } },
];

const DROPDOWN_ENUM = {
  VEHICLE_DDL_DATA,
};

export default DROPDOWN_ENUM;
