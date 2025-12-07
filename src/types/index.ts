type UserRole = "Guest" | "Admin" | "Buyer" | "Farmer";

interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}
export type { UserRole, ApiResponse };
