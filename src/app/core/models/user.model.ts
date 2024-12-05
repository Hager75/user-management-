import { FormControl } from '@angular/forms';

export interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface userFormData {
  email: string;
  password: string;
}

export interface loginUserResponse {
  token: string;
}

export interface UserInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserListResponse{
    page: number;
    per_page:  number;
    total:  number;
    total_pages:  number;
    data:UserInfo[];
    support:{
        url:string;
        text:string
    }
}

export interface UserResponse {
  data: UserInfo;
  support:{
      url:string;
      text:string
  }
}