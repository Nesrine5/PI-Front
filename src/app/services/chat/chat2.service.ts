import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from 'app/models/chat/chat';
import { Message } from 'app/models/chat/message';
import { User } from 'app/models/chat/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Chat2Service {

  private baseUrl = 'http://localhost:8090/intership/api';

  constructor(private http: HttpClient) { }



  getAllChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>("http://localhost:8090/intership/api/chat/getAll");
  }

  deleteChat(chatId: number): Observable<void> {
    return this.http.delete<void>("http://localhost:8090/intership/api/chat/delete/"+chatId);
  }

 //getChatById(chatId: number): Observable<Chat> {
  getChatById(chatId: any): Observable<Chat> {
    const url = `${this.baseUrl}/chat/get?idChat=${chatId}`; // Construct the URL for fetching chat by ID
    return this.http.get<Chat>(url); // Make the HTTP GET request and return the Observable
  }
 /*
  getChatById(chatId: any) {
    return this.http.get<Chat>(this.baseUrl + "/chats/" + chatId)
  }*/

  /*addMessageToChat(chatId: number, message: Message): Observable<Message> {
    return this.http.post<Message>("http://localhost:8090/intership/api/chat/"+chatId+"/messages", message);
  }*/
  addMessageToChat(chatId: number, senderId: number, message: Message): Observable<Message> {
    // Construct the URL using template literals
    const url = `http://localhost:8090/intership/api/chat/${chatId}/messages/${senderId}`;
  
    // Make an HTTP POST request with the message object as the request body
    return this.http.post<Message>(url, message);
  }
  

  // Method to fetch messages of a chat
  getChatMessages(chatId: number): Observable<Message[]> {
    return this.http.get<Message[]>("http://localhost:8090/intership/api/chat/"+chatId+"/messages");
  }


  searchUsers(searchText: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user/search?searchText=${searchText}`);
  }

  createChatWithUser(userId: number): Observable<Chat> {
    return this.http.post<Chat>("http://localhost:8090/intership/api/chat/add/user", userId);
  }


  getUserOnlineStatus(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/user/onlineStatus/${userId}`);
  }

  // Method to update online status of current user
  updateUserOnlineStatus(userId: number, online: boolean): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/user/onlineStatus/${userId}`, { online });
  }

  getChatByFirstUserNameAndSecondUserName(firstUserName: String, secondUserName: String) {
    return this.http.get<Chat>(this.baseUrl + "/chat/getChatByFirstUserNameAndSecondUserName" + '?firstUserName=' + firstUserName + '&secondUserName=' + secondUserName)
  }
  createChatRoom(chat: Chat): Observable<Object> {
    return this.http.post(this.baseUrl + "/chat/add", chat);
  }


}
