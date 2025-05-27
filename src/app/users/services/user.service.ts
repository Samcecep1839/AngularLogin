import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { Observable, of } from 'rxjs';
import { Role, RolesResponse,  User,  UserResponse, UsersResponse } from '../interfaces/user.interface';

interface Options{
  limit?: number,
  page?: number,
}

const emptyUser: User = {
  id: 'new',
  first_name: '',
  last_name: '',
  email: '',
  telephone: '',
  avatar: 'avatar-user.png',
  password: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  Role: {} as Role
};

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {

  getUsers(options: Options): Observable<UsersResponse>{
    const { limit = 4, page = 0 } = options;
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`, {params:{limit,page}});
  }
  
    getUser(id: string): Observable<UserResponse>{
      if(id === 'new')
        return of({
          success: false,
          message: '',
          data: emptyUser,
        }); 

      return this.http.get<UserResponse>(`${this.apiUrl}/users/${id}`);
  }

  getRoles(): Observable<RolesResponse> {
  return this.http.get<RolesResponse>(`${this.apiUrl}/roles`);
 }

  created(data: any):Observable<any>{
    return this.http.post(`${this.apiUrl}/users`, data);
  }

  update(id: string, data:any):Observable<any>{
    return this.http.patch(`${this.apiUrl}/users/${id}`, data);
  }

  uploadAvatar(id: string, image: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', image);
    return this.http.put<string>(`${this.apiUrl}/users/avatar/${id}`, formData);
}
}
