export enum OrderStatus {
  Cart = 0,
  Pending = 1,
  Processing = 2,
  Processed = 3,
  Shipping = 4,
  Delivered = 5,
  Cancelled = 6,
  Returning = 7,
  Completed = 8,
}

export enum VehicleType {
  Scooter = 1,
  Car = 2,
}

export enum VehicleStatus {
  Available = 1,
  InUse = 2,
  Unavailable = 3,
}

export enum OrderSize {
  Small = 1,
  Large = 2,
}

// User interfaces
export interface UserDTO {
  userId: number;
  name: string;
  email?: string;
  phoneNumber?: string;
}

export interface StaffDTO {
  staffId: number;
  name: string;
}

// Vehicle interfaces
export interface VehicleInfoDto {
  vehicleId?: number;
  vehicleName: string;
  licensePlate: string;
  vehicleType: VehicleType;
  orderSize?: OrderSize;
}

// Order item interfaces
export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderItemDTO {
  orderDetailId: number;
  quantity: number;
  itemType: string;
  itemName: string;
  itemId?: number;
}

export interface RentalInfoDTO {
  rentalStartDate: string;
  expectedReturnDate: string;
}

// Shipping interfaces
export interface ShippingInfoDTO {
  shippingOrderId: number;
  deliveryTime?: string;
  isDelivered: boolean;
  deliveryNotes?: string;
  staff?: StaffDTO;
}

export interface ShippingDetailDTO {
  shippingOrderId: number;
  staffId: number;
  staffName: string;
  deliveryTime?: string;
  deliveryNotes?: string;
  isDelivered: boolean;
}

export interface OrderWithDetailsDTO {
  orderId: string;
  address: string;
  notes?: string;
  totalPrice: number;
  status: OrderStatus;
  hasSellItems: boolean;
  hasRentItems: boolean;
  userId: number;
  userName: string;

  // Staff assignment status
  isPreparationStaffAssigned: boolean;
  isShippingStaffAssigned: boolean;

  // Staff assignments
  preparationAssignments?: StaffAssignmentSummaryDTO[];
  shippingAssignment?: StaffAssignmentSummaryDTO;

  shippingInfo?: ShippingInfoDTO;
  vehicleInfo?: VehicleInfoDto;
}

export interface OrderDetailDTO {
  orderCode: string;
  orderId: number;
  address: string;
  notes?: string;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
  userId: number;
  userName: string;
  userPhone: string;

  // Staff assignments
  preparationAssignments?: StaffAssignmentDTO[];
  shippingAssignment?: StaffAssignmentDTO;

  shippingInfo?: ShippingDetailDTO;
  hasSellItems: boolean;
  hasRentItems: boolean;
  orderItems: OrderItemDTO[];
  rentalInfo?: RentalInfoDTO;
  vehicleInfo?: VehicleInfoDto;
}

export interface PendingDeliveryDTO {
  shippingOrderId: number;
  orderId: string; // Changed to string (orderCode)
  deliveryTime?: string;
  deliveryNotes?: string;
  address: string;
  notes?: string;
  totalPrice: number;
  status: OrderStatus;
  userId: number;
  userName: string;
  vehicleInfo?: VehicleInfoDto;
}

export interface StaffShippingOrderDTO {
  shippingOrderId: number;
  orderId: string; // Changed to string (orderCode)
  deliveryTime?: string;
  deliveryNotes?: string;
  isDelivered: boolean;
  address: string;
  notes?: string;
  totalPrice: number;
  status: OrderStatus;
  customerId: number;
  customerName: string;
  hasSellItems: boolean;
  hasRentItems: boolean;
}

export interface ShippingOrderAllocationDTO {
  shippingOrderId: number;
  orderId: number;
  orderCode: string;
  staffId: number;
  staffName: string;
  vehicleId?: number;
  vehicleName?: string;
  vehicleType?: VehicleType;
  isDelivered: boolean;
  createdAt: string;
  orderSize?: OrderSize;
}

export interface OrderStatusUpdateDTO {
  orderCode: string;
  orderId: number;
  status: OrderStatus;
  updatedAt: string;
}

export interface DeliveryStatusUpdateDTO {
  shippingOrderId: number;
  orderCode: string;
  orderId: number;
  isDelivered: boolean;
  deliveryTime?: string;
  deliveryNotes?: string;
  updatedAt: string;
}

export interface DeliveryTimeUpdateDTO {
  shippingOrderId: number;
  orderId: number;
  orderCode: string;
  deliveryTime: string;
  updatedAt: string;
}

export interface OrderSizeDTO {
  orderCode: string; // Changed to string (orderCode)
  size: OrderSize;
  suggestedVehicleType: VehicleType;
}

// Request interfaces
export interface AllocateOrderRequest {
  orderCode: string; // Changed to string (orderCode)
  staffId: number;
}

export interface AllocateOrderWithVehicleRequest {
  orderCode: string; // Changed to string (orderCode)
  staffId: number;
  taskType: StaffTaskType;
  vehicleId?: number;
}

export interface OrderStatusUpdateRequest {
  status: OrderStatus;
}

export interface DeliveryStatusUpdateRequest {
  isDelivered: boolean;
  notes?: string;
}

export interface DeliveryTimeUpdateRequest {
  deliveryTime: string;
}

// API response interfaces
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// Query parameter interfaces
export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

export interface OrderQueryParams extends PaginationParams {
  sortBy?: string;
  sortDescending?: boolean;
  searchTerm?: string;
  status?: OrderStatus;
  fromDate?: string;
  toDate?: string;
  customerId?: number;
}

export interface ShippingOrderQueryParams extends PaginationParams {
  sortBy?: string;
  sortDescending?: boolean;
  searchTerm?: string;
  isDelivered?: boolean;
  staffId?: number;
  fromDate?: string;
  toDate?: string;
}

export interface UnallocatedOrderDTO {
  orderId: number;
  orderCode: string;
  address: string;
  notes: string | null;
  totalPrice: number;
  status: OrderStatus;
  userId: number;
  userName: string;
  hasSellItems: boolean;
  hasRentItems: boolean;
}

export interface StaffAssignmentRequest {
  orderCode: string; // Changed to string (orderCode)
  staffId: number;
  taskType: StaffTaskType;
  vehicleId?: number;
}

export interface StaffAssignmentResponse {
  orderId: number;
  orderCode: string;
  staffId: number;
  staffName: string;
  status: OrderStatus;
  assignedAt: string;
  // Shipping-specific properties
  shippingOrderId?: number;
  isDelivered?: boolean;
  vehicleId?: number;
  vehicleName?: string;
  vehicleType?: VehicleType;
  orderSize?: OrderSize;
  // Task type that was performed
  taskType: StaffTaskType;
}

export enum StaffTaskType {
  Preparation = 1,
  Shipping = 2,
  Pickup = 3,
}

export interface MultiStaffAssignmentRequest {
  orderCode: string;
  preparationStaffIds?: number[];
  shippingStaffId?: number;
  vehicleId?: number;
}

// Define the new response interface
export interface MultiStaffAssignmentResponse {
  orderId: number;
  orderCode: string;
  status: OrderStatus;

  // Preparation staff details
  preparationStaffAssignments: StaffAssignmentSummary[];

  // Shipping staff details
  shippingStaffId: number;
  shippingStaffName: string;
  shippingAssignmentId: number;
  shippingAssignedAt: string;

  // Shipping details
  shippingOrderId?: number;
  isDelivered: boolean;
  vehicleId?: number;
  vehicleName?: string;
  vehicleType?: VehicleType;
  orderSize: OrderSize;
}
export interface StaffAssignmentSummary {
  staffId: number;
  staffName: string;
  assignedDate: string; // ISO date string
}
export interface StaffAssignmentDTO {
  assignmentId: number;
  staffId: number;
  staffName: string;
  taskType: StaffTaskType;
  assignedDate: string;
  completedDate?: string;
}

export interface StaffAssignmentSummaryDTO {
  staffId: number;
  staffName: string;
  assignedDate: string;
}
