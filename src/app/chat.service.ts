import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Message } from './models/message';
import { User } from './models/user';

@Injectable()
export class ChatService {
  private dataStore: { messages: Message[], users: User[] } = { 
    messages: [], 
    users: []
  };
  private _messages: BehaviorSubject<Message[]> = new BehaviorSubject([]);
  public readonly messages: Observable<Message[]> = this._messages.asObservable();
  private _users: BehaviorSubject<User[]> = new BehaviorSubject([]);
  public readonly users: Observable<User[]> = this._users.asObservable();

  constructor(private http: HttpClient) { 
    http.get<Message[]>('assets/messages.json')
        .subscribe((msgs: Message[]) => {
          this.dataStore.messages = msgs.sort((a, b) => { return (a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0) });
          this._messages.next(Object.assign({}, this.dataStore).messages);
        });
    http.get<User[]>('assets/onlineUsers.json')
        .subscribe((users: User[]) => {
          this.dataStore.users = users;
          this._users.next(Object.assign({}, this.dataStore).users);
        });
  }

  sendMessage(msg: Message): void {
    this.dataStore.messages.push(msg);
    this._messages.next(Object.assign({}, this.dataStore).messages);
  }
}
