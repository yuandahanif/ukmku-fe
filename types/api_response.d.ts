export interface API_Response<JSON = unknown> {
  status: string;
  code: string;
  data: JSON;
}
