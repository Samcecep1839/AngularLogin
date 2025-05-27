import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { Observable, of } from 'rxjs';
import { Role, RolesResponse, UserCreated, UserResponse, UsersResponse } from '../interfaces/user.interface';

const emptyUser: UserCreated = {
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

  getUsers(): Observable<UsersResponse>{
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`);
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
}
