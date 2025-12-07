import type { ApiResponse } from "../../../../types";

interface User {
  fullname: string;
  email: string;
  phone: string;
  avatarUrl: string;
  accountId: string;
  createdAt: string;
  id: string;
}

type GetUserListResponse = ApiResponse<User[]>;
export type { User, GetUserListResponse };
