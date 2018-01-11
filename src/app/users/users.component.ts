import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ChatService } from '../chat.service';

@Component({
  selector: 'chat-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() curUser: User;
  users: User[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.users
      .subscribe((users: User[]) => {
        this.users = users.filter(user => user.name != this.curUser.name);
      });
  }
}
