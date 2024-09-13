import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TelegramService {

  private apiToken = '6043354114:AAGhSsJA1nKyBSoHUPi39iSUWsHVLjp-Erc';
  private chatId = '1002179864666';

  constructor(
    private http: HttpClient
  ) { }

  getLatestMessages(): Observable<any> {
    const url = `https://api.telegram.org/bot${this.apiToken}/getUpdates`;
    return this.http.get(url);
  }
}
