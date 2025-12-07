import type { ApiResponse } from "../../../../types";

type Status = "Upcoming" | "Active" | "Completed";

interface Season {
  seasonName: string;
  seasonDesc: string;
  status: Status;
  startDate: string;
  endDate: string;
  createdAt: string;
  farmId: string;
  id: string;
}
type SeasonDetailResponse = ApiResponse<Season>;

export type { Season, SeasonDetailResponse, Status };
