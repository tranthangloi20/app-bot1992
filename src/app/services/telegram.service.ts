import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  private token = `6043354114:AAFsEeoPavjFjFWmA4qikn_U3CpJuzg4trM`;
  private apiUrl = `https://api.telegram.org/bot${this.token}`;
  private chatId = `-1002180387816`;

  constructor(
    private http: HttpClient,
  ) { }

  public getUpdates(offset: number = 0): Observable<any> {
    // Để "xóa" tin nhắn trong Telegram bot,
    // bạn có thể đánh dấu các tin nhắn là đã đọc bằng cách cập nhật offset = -1.
    const url = `${this.apiUrl}/getUpdates?offset=${offset}`;
    return this.http.get<any>(url);
  }

  public getUnreadMessages(lastOffset: number = 0): Observable<any> {
    const url = `${this.apiUrl}/getUpdates?offset=${lastOffset + 1}`;
    return this.http.get(url);
  }

  public sendMessage(message: string): Observable<any> {
    const url = `${this.apiUrl}/sendMessage`;
    const body = {
      chat_id: this.chatId,
      text: message
    };
    return this.http.post(url, body);
  }

  public deleteMessage(messageId: number): Observable<any> {
    const url = `${this.apiUrl}/deleteMessage`;
    const body = {
      chat_id: this.chatId,
      message_id: messageId
    };
    return this.http.post(url, body);
  }

  public deleteAllMessages(messageIds: number[]): void {
    messageIds.forEach((id) => {
      this.deleteMessage(id).subscribe({
        next: (res) => console.log(`Deleted message with ID: ${id}`),
        error: (err) => console.error(`Failed to delete message with ID: ${id}`, err)
      });
    });
  }
}