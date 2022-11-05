// import axiosClient from '../axiosClient';

import axios from 'axios';

type ProvinceModel = {
  code: string;
  isDeleted: boolean;
  name: string;
  name_with_type: string;
  slug: string;
  type: string;
  _id: string;
};

type DistrictModel = {
  _id: string;
  name: string;
  type: string;
  slug: string;
  name_with_type: string;
  path: string;
  path_with_type: string;
  code: string;
  parent_code: string;
  isDeleted: boolean;
};

const ProvinceService = {
  async getAllProvinceName() {
    const provinces = await axios({
      method: 'get',
      url: 'https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res: ProvinceModel[] = provinces.data.data.data;
    return res;
  },
  async getAllDistrictName() {
    const provinces = await axios({
      method: 'get',
      url: 'https://vn-public-apis.fpo.vn/districts/getAll?limit=-1',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res: DistrictModel[] = provinces.data.data.data;
    return res;
  },
  searchProvince(value: string, array: any[]) {
    return array.filter((item) => item.include(value));
  },
};

export default ProvinceService;
