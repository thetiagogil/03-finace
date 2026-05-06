export interface TxModel {
  id?: string;
  user_id: string;
  type: string;
  status: "tracked" | "planned";
  category: string;
  date: string;
  value: number;
  description?: string | undefined;
}
