import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { Observable, of } from 'rxjs';
import { RolesResponse, User, UserResponse, UsersResponse } from '../interfaces/user.interface';

const emptyUser: UserResponse = {
   success: false,
    message: '',
    data:   {} as User,
};

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {

  getUsers(): Observable<UsersResponse>{
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`);
  }
  
    getUser(id: string): Observable<UserResponse>{
      if(id === 'new') return of(emptyUser); 
      return this.http.get<UserResponse>(`${this.apiUrl}/users/${id}`);
  }

  getRoles(): Observable<RolesResponse> {
  return this.http.get<RolesResponse>(`${this.apiUrl}/roles`);
 }

  created(data: any):Observable<any>{
    return this.http.post(`${this.apiUrl}/users`, data);
  }

  Update(id: string, data:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/users/${id}`, data);
  }
}
