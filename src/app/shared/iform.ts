export interface IForm {
  callValueFromInput: (arg: string) => string;
}

export interface ISelect {
  value: string;
  viewValue: string;
  checked?: boolean;
  check?: string;
}
