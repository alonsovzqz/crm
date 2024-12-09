declare type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company_id: string;
};

declare type Company = {
  id: string;
  name: string;
  created_at: string;
};

declare type Resource = {
  name: string;
  list: string;
  create: string;
  edit: string;
};
