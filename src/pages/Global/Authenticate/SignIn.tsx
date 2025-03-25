// import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import * as Yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
// import authApi from "../../services/api/AuthAPI";
// import "./SignIn.scss";
import classNames from "classnames/bind";
import styles from "./authenticate.module.scss";
import authApi from "../../../api/authAPI";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
// import useAuth from "../../hooks/useAuth";

export const AuthenticatePage = () => {
  const navigate = useNavigate();
  const cx = classNames.bind(styles);
  const { setAuth } = useAuth();

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required("Tài khoản không được để trống!")
      .min(3, "Độ dài tài khoản phải tối thiểu 3 kí tự"),
    password: Yup.string()
      .required("Mật khẩu không được để trống!")
      .min(4, "Độ dài mật khẩu phải tối thiểu 4 kí tự"),
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("data truyền: ", values);
      try {
        const response: any = await authApi.login({
          phoneNumber: values.phoneNumber,
          password: values.password,
        });
        localStorage.setItem("userInfor", JSON.stringify(response?.data));
        console.log("first", response?.data);
        navigate("/dashboard");
        setAuth({
          user: response?.data,
          accessToken: response?.data?.accessToken,
        });
        // if (response?.role == "Admin") {
        //   navigate("/warranty");
        // } else {
        //   navigate("/forbidden");
        // }
        toast.success("Đăng nhập thành công!");
      } catch (error: any) {
        console.error("Login failed:", error);
        toast.error(error.message || "Đăng nhập không thành công!");
      }
    },
  });

  return (
    <div className={cx("bg-login-container")}>
      <div className={cx("wrapper")}>
        <form onSubmit={formik.handleSubmit}>
          <h1 className={cx("title")}>Đăng Nhập</h1>
          <div className={cx("input-box")}>
            <input
              id="phoneNumber"
              type="text"
              className={cx("input-text")}
              placeholder="Tên đăng nhập *"
              {...formik.getFieldProps("phoneNumber")}
            />
            <FaUser className={cx("icon")} />
          </div>
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className={cx("error")}>{formik.errors.phoneNumber}</div>
          ) : null}
          <div className={cx("input-box")}>
            <input
              id="password"
              type="password"
              className={cx("input-text")}
              style={{ color: "black" }}
              placeholder="Mật khẩu *"
              {...formik.getFieldProps("password")}
            />
            <FaLock className={cx("icon")} />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className={cx("error")}>{formik.errors.password}</div>
          ) : null}

          <button type="submit" className={cx("button-submit")}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};
