import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
  imports: [FormsModule, NgFor],
  standalone: true,
})
export class MessengerComponent implements OnInit {
  message: string | undefined;
  messages: string[] = [];

  ws= webSocket('ws://localhost:8000');

  constructor() { } 

  ngOnInit(): void {
    this.ws.subscribe((message: any) => {
      console.log(message)
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.message) {
      this.ws.next(this.message);
      this.message = '';
    }
  }
}