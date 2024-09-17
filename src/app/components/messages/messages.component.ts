import { Component, OnInit, OnDestroy } from '@angular/core';

import { TelegramService } from '../../services/index';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, OnDestroy {

  public messages: any[] = [];
  private offset: number = 0;

  constructor(
    private telegramService: TelegramService,
  ) {

  }

  ngOnInit() {
    this.getMessages();
  }

  ngOnDestroy(): void {
    // todo
  }

  private getMessages(): void {
    this.telegramService.getUpdates(this.offset).subscribe(data => {
      if (data.result.length > 0) {
        const lastUpdate = data.result[data.result.length - 1];
        this.offset = lastUpdate.update_id + 1;

        // Xử lý tin nhắn
        console.log(lastUpdate);
        this.messages.push(lastUpdate?.channel_post?.text);
      }

      // Lặp lại để lấy tin nhắn liên tục
      setTimeout(() => this.getMessages(), 5000);
    });
  }

  public clear(): void {
    const messageIds = [123, 124, 125]; // Thay thế bằng các message_id cần xóa
    this.telegramService.deleteAllMessages(messageIds);
  }

  public send(): void {
    this.telegramService.sendMessage('Hello, Telegram!').subscribe({
      next: (response) => {
        console.log('Message sent!', response)
      },
      error: (error) => {
        console.error('Error sending message:', error)
      }
    });
  }

}
