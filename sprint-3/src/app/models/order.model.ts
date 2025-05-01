export interface Order {
  id?: string;
  customerId: string;
  items: { name: string; quantity: number }[];
  status: string;
  table: string;
  timestamp?: any;
  estimatedTime?: number;
}
