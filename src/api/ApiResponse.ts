export interface IAPIResponse {
  status: "success" | "failed";
  message: string;
  data?: any[];
}