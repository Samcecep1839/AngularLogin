import { Injectable } from '@angular/core';
import { Role, RoleResponse, RolesResponse } from '@roles/interfaces/role.interface';
import { BaseHttpService } from '@shared/services/base-http.service';
import { Observable, of, tap } from 'rxjs';
import { Options } from '@shared/interfaces/shared.interfaces'
const emptyRole: Role = {
  id: 'new',
  name: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

@Injectable({
  providedIn: 'root'
})
export class RolesService extends BaseHttpService {
  private roleCache = new Map<string, RoleResponse>();
  private rolesCache = new Map<string, RolesResponse>();

  getRoles(options: Options): Observable<RolesResponse> {

    const { limit = 5, page = 1 } = options;

    const key = `roles-${page}-${limit}`;

    if (this.rolesCache.has(key)) {
      return of(this.rolesCache.get(key)!);
    }

    return this.http
      .get<RolesResponse>(`${this.apiUrl}/roles`,{
        params: { limit, page },
      })
      .pipe(tap((resp) => this.rolesCache.set(key, resp)));

  }


  getRole(id: string): Observable<RoleResponse> {
    if (id === 'new') {
      return of({
        success: false,
        message: '',
        data: emptyRole,
      });
    }

    if (this.roleCache.has(id)) {
      return of(this.roleCache.get(id)!);
    }

    return this.http
      .get<RoleResponse>(`${this.apiUrl}/roles/${id}`)
      .pipe(tap((resp) => this.roleCache.set(id, resp)));
  }

  created(data: any): Observable<RoleResponse> {
    return this.http
      .post<RoleResponse>(`${this.apiUrl}/roles`, data)
      .pipe(tap((resp) => this.addRoleToCache(resp)));
  }

  updated(id: string, data: any): Observable<RoleResponse> {
    return this.http
      .put<RoleResponse>(`${this.apiUrl}/roles/${id}`, data)
      .pipe(tap((resp) => this.UpdatedRoleToCache(id, data)));
  }


  deletedRole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/roles/${id}`)
  }

  addRoleToCache(roleResponse: RoleResponse) {
    if (!roleResponse.data.id) return;

    this.roleCache.set(roleResponse.data.id, roleResponse);

    this.rolesCache.forEach((rolesResponse) => {
      rolesResponse.data.roles = [
        roleResponse.data,
        ...rolesResponse.data.roles,
      ];
    });
  }

  UpdatedRoleToCache(id: any, role: any) {
    role.id = id;
    const data: RoleResponse = {
      success: true,
      message: '',
      data: role,
    };
    this.roleCache.set(id, data);

    this.rolesCache.forEach((rolesResponse) => {
      rolesResponse.data.roles = rolesResponse.data.roles.map((currentRole) =>
        currentRole.id === id ? role : currentRole,
      );
    });

  }




}
