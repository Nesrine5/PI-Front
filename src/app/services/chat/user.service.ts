import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/chat/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:8090";

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<User[]>(this.baseUrl + "/user/getall")
  }

  adduser(user: User): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/user/add", user);
  }

  getUserByUsername(username: any) {
    return this.httpClient.get<User>(this.baseUrl + "/user/getbyusername/" + username)
  }

}
