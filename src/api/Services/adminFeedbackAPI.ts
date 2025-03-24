import axiosClient from "../axiosInstance";


const url = "/admin/"
const adminFeedbackAPI = {
  getListFeedback: (params?: any) => {

    return axiosClient.get(url, {
      params,
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
  CreateFeedback: (params?: any) => {

    return axiosClient.post(url, params, {
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
  getFeedbackDetails: (params?: any) => {

    return axiosClient.post(url, params, {
      paramsSerializer: {
        indexes: null, // by default: false
      },
    });
  },
};

export default adminFeedbackAPI;
