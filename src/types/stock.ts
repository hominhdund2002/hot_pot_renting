export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[] | null;
}

// HotPot Inventory Interfaces
export interface HotPotInventoryDto {
  hotPotInventoryId: number;
  seriesNumber: string;
  status: string;
  hotpotName: string;
}

export interface DamageDeviceDto {
  damageDeviceId: number;
  name: string;
  description: string;
  status: string;
  loggedDate: Date;
}

export interface HotPotInventoryDetailDto extends HotPotInventoryDto {
  hotpotId: number;
  createdAt?: Date;
  updatedAt?: Date;
  conditionLogs: DamageDeviceDto[];
}

// Utensil Interfaces
export interface UtensilDto {
  utensilId: number;
  name: string;
  material: string;
  utensilTypeName: string;
  status: boolean;
  quantity: number;
}

export interface UtensilDetailDto extends UtensilDto {
  description: string;
  imageURL: string;
  price: number;
  lastMaintainDate: Date;
  utensilTypeId: number;
  createdAt?: Date;
  updatedAt?: Date;
  conditionLogs: DamageDeviceDto[];
}

// Equipment Status Interfaces
export interface EquipmentStatusDto {
  equipmentType: string;
  totalCount: number;
  availableCount: number;
  unavailableCount: number;
  lowStockCount: number;
  availabilityPercentage: number;
}

// Request Interfaces
export interface UpdateEquipmentStatusRequest {
  // Changed to match backend properties
  hotpotStatus?: number; // Enum value for HotpotStatus
  isAvailable?: boolean; // For utensils
  reason: string;
}

export interface UpdateUtensilQuantityRequest {
  quantity: number;
}

export interface NotifyAdminStockRequest {
  notificationType: string; // "LowStock" or "StatusChange"
  equipmentType: string; // "HotPot" or "Utensil"
  equipmentId: number;
  equipmentName: string;
  currentQuantity?: number;
  threshold?: number;
  isAvailable?: boolean;
  reason?: string;
}

// Response Interfaces for specific endpoints
export interface EquipmentUnavailableResponse {
  unavailableHotPots: HotPotInventoryDto[];
  unavailableUtensils: UtensilDto[];
  totalUnavailableCount: number;
}

export interface EquipmentAvailableResponse {
  availableHotPots: HotPotInventoryDto[];
  availableUtensils: UtensilDto[];
  totalAvailableCount: number;
}

export interface EquipmentDashboardResponse {
  statusSummary: EquipmentStatusDto[];
  lowStockUtensils: UtensilDto[];
  unavailableHotPots: HotPotInventoryDto[];
  unavailableUtensils: UtensilDto[];
  totalEquipmentCount: number;
  totalAvailableCount: number;
  totalUnavailableCount: number;
  totalLowStockCount: number;
}

// Add HotpotStatus enum to match backend
export enum HotpotStatus {
  Available = 0,
  Rented = 1,
  Damaged = 2,
  Reserved = 3,
  Preparing = 4,
}
