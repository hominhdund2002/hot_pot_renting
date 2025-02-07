import React from "react";
import { Route, Routes } from "react-router-dom";
import config from "../configs";
import Home from "../pages/Home/Home";
import StaffLayout from "../layouts/StaffLayout/StaffLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import AdminLayout from "../layouts/AdminLayout/LayoutAdmin";
import FeedbackDetailPage from "../pages/Admin/Feedback/FeedbackDetailPage";
import FeedbackPage from "../pages/Admin/Feedback/FeedbackPage";
import CreateComboPage from "../pages/Admin/Combohotpot/CreateComboPage";
import CreateIngredientsPage from "../pages/Admin/CreateIngredients/CreateIngredientsPage";

// import CheckRoute from "./CheckRoute";
// import RequireAuth from "./RequireAuth";
// import { Role } from "./Roles";

const AppRoute: React.FC = () => {
  return (
    <Routes>
      <Route
        key="layoutAdmin"
        path={config.adminRoutes.dashboard}
        element={<AdminLayout />}
      >
        <Route
          key="dashboard"
          path={config.adminRoutes.dashboard}
          element={<Dashboard />}
        />
        <Route
          key="feedbackTable"
          path={config.adminRoutes.feedback}
          element={<FeedbackPage />}
        />
        <Route
          key="feedbackDetail"
          path={config.adminRoutes.feedbackDetail}
          element={<FeedbackDetailPage />}
        />
        <Route
          key="createCombo"
          path={config.adminRoutes.createHotPotCombo}
          element={<CreateComboPage />}
        />
        <Route
          key="createIngredients"
          path={config.adminRoutes.createIngredients}
          element={<CreateIngredientsPage />}
        />
      </Route>
      <Route key="layout" path={config.routes.home} element={<StaffLayout />}>
        <Route key="home" path={config.routes.home} element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
