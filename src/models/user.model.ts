export interface UserModel {
  firstname?: string;
  lastname?: string;
  wallet_current_balance?: number | null;
  wallet_initial_balance?: number | null;
  wallet_currency?: string | null;
}
