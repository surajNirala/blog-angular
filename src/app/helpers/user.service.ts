import { User } from './user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL: string = "http://localhost:4200/api/";
  constructor(private _httpService: HttpClient) { }

  getUsers() {
    return this._httpService.get(this.BASE_URL + 'getUsers');
  }

  addUser(user:User){
    return this._httpService.post(`${this.BASE_URL}getUsers`,user)
  }

  updateUser(user:User){
    return this._httpService.put(`${this.BASE_URL}getUsers/${user.id}`,user)
  }

  deleteUser(user_id: number) {
    return this._httpService.delete(`${this.BASE_URL}getUsers/${user_id}`)
  }
}
