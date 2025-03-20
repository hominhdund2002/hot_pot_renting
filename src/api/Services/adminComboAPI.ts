import axiosClient from "../axiosInstance";

const adminComboAPI = {
  getListCombo: (params?: any) => {
    const url = "/admin/combo";
    return axiosClient.get(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
  CreateAdminCombo: (params?: any) => {
    const url = "/admin/combo";
    return axiosClient.post(url, params, {
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
};

export default adminComboAPI;
