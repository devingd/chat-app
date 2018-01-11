import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../models/message';

@Component({
  selector: 'chat-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() sender: string;

  dateFormat: string = (window.innerWidth < 750) ? 'short' : 'medium';
  history: Message[] = [];
  text: string = "";
  unread: boolean = false;

  constructor(private chatService: ChatService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.dateFormat = (event.target.innerWidth < 750) ? 'short' : 'medium';

  }

  ngOnInit() {
    this.chatService.messages
      .subscribe((messages: Message[]) => {
        this.history = messages;
        this.unread = true;
      });
  }

  ngAfterViewChecked() {
    if(this.unread) {
      let histDiv = document.getElementById("history");
      histDiv.scrollTop = histDiv.scrollHeight;
      this.unread = false;
    }
  }

  send() {
    if(this.text.length) {
      let message: Message = {
        text: this.text,
        sender: this.sender,
        timestamp: new Date()
      };
      this.chatService.sendMessage(message);
      this.text = "";
    }
  }
}
