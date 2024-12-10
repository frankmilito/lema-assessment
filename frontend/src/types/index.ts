export type TableRowProps = {
  name: string;
  email: string;
  address: string;
};

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
