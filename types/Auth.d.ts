export type Role = 'Admin' | 'UMKM';

export interface Auth {
  role?: Role;
  loading?: JSX.Element;
  unauthorized?: string; // redirect to this url
}
