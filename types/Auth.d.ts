export type Role = 'admin' | 'umkm';

export interface Auth {
  role?: Role;
  loading?: JSX.Element;
  unauthorized?: string; // redirect to this url
}
