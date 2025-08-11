export type Option = {
  value: string | boolean;
  icon: string;
};

export type Thead = {
  title: string;
  keyname: string;
  type?: string;
  subkeyname?: string;
};

export type Field = {
  name: string;
  title: string;
  value: string;
  icon?: string;
  type?: string;
  placeholder?: string;
  col: number;
  option?: Option[];
  isShow?: string;
  validator?: string[] | boolean[];
  thead?: Thead[];
  startDate?: string;
  endDate?: string;
};

export type FieldGroup = {
  title: string;
  defaultCol: number;
  fields: Field[];
};

export type Step = {
  step: number;
  name: string;
  allFields: FieldGroup[];
  key: string;
  validator?: string | boolean;
};
