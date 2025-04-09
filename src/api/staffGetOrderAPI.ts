import  axiosClient  from "./axiosInstance";

const staffGetOrderApi = {

    getAssignOrderByStaffId: ( id?:any ) =>
        {
          const url = `/staff/orders/assigned/${id}`;
          return axiosClient.get(url);
        },
};

export default staffGetOrderApi;