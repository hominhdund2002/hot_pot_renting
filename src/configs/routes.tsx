export const managerRoutes = {
  home: "/",
  manageRentals: "/manage-rentals",
  manageRentalStatus: "/manage-rental-status",
  equipmentAvailability: "/equipment-availability",
  workAssignment: "/work-assignment",
  manageOrder: "/manage-order",
  customerChat: "/chat",
  feedback: "/feedback",
  resolveEquipmentFailure: "/resolve-equipment-failure",
  equipmentConditionLog: "/equipment-condition-log",
  equipmentStatusReport: "/equipment-status-report",
  feedbackManagement: "/feedback-management",
  manageReplacement: "/manage-replacement",
  rentalDashboard: "/rental-dashboard",
  unassignedPickups: "/unassigned-pickups",
  currentAssignments: "/current-assignments",
  rentalHistory: "/rental-history",
  calculateLateFee: "/calculate-late-fee",
  adjustReturnDate: "/adjust-return-date",
};

export const authRoutes = {
  authenticate: "/auth",
};

export const adminRoutes = {
  dashboard: "/dashboard",
  orders: "/dashboard/orders",
  feedbackDetail: "/dashboard/feedback/:feedbackId",
  feedback: "/dashboard/feedback",
  tableHotPotCombo: "/dashboard/hotpotCombo",
  createHotPotCombo: "/dashboard/createCombo",
  profile: "/profile",
  createIngredients: "/dashboard/createIngredients",
  manageUsers: "/dashboard/listUsers",
  manageIngredients: "/dashboard/listIngredients",
  hotpotType: "/dashboard/hotpot",
  addHotpot: "/dashboard/addHotpot",
  HotpotDetail: "/dashboard/hotpotCombo/detail/:comboId",
  ingredientType: "/dashboard/ingredientType",
  DetailHotpotType: "/dashboard/hotpotType/detail/:hotpotId",
  MaintenanceHotpot: "/dashboard/hotpotMaintenance",
};

export const staffRoutes = {
  paymentManagement: "/payment-management",
  depositConfirmation: "/deposit-confirmation",
  retrieveRentalEquipment: "/retrieve-rental-equipment",
  checkDeviceAfterReturn: "/check-device-after-return",
  orderHistory: "/order-history",
  assignOrder: "/assign-order",
  proofOfDelivery: "/proof-of-delivery",
  rentalDetail: "/staff/rentals/:id",
  recordReturn: "/staff/rentals/record-return",
  pickupRental: "/pickup-rental",
};
