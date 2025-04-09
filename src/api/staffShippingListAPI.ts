import  axiosClient  from "./axiosInstance";

const staffShippingListApi = {

    getShippingOrderByStaffId: ( staffId?:any ) =>
        {
          const url = `/staff/shipping/pending/${staffId}`;
          return axiosClient.get(url);
        },
};

export default staffShippingListApi;