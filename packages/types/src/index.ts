export interface HealthResponse {
  status: 'ok';
  uptime: number;
  timestamp: string;
}

export interface ApiError {
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  data: T;
}
