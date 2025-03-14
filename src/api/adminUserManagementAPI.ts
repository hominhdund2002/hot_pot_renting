import axiosClient from "./axiosInstance";

const adminUserManagementAPI = {
    getListUser: ( params?:any ) =>
        {
          const url = "/admin/users";
          return axiosClient.get( url, {
            params,
            paramsSerializer: {
              indexes: null, // by default: false
            },
          } );
        },
}

export default adminUserManagementAPI;