export type TableRowProps = {
  id: string;
  name: string;
  email: string;
  address: string;
};

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}
export interface Post {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: Date;
}

export type NewPostPayload = {
  user_id: string;
  body: string;
  title: string;
};
