import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class BinanceService {
  private apiKey = 'YOUR_BINANCE_API_KEY';
  private apiSecret = 'YOUR_BINANCE_API_SECRET';
  private binanceUrl = 'https://api.binance.com';

  constructor(private http: HttpClient) { }

  private getSignature(queryString: string): string {
    return crypto.HmacSHA256(queryString, this.apiSecret).toString();
  }

  placeOrder(symbol: string, side: string, quantity: string) {
    const timestamp = Date.now();
    const queryString = `symbol=${symbol}&side=${side}&type=MARKET&quantity=${quantity}&timestamp=${timestamp}`;
    const signature = this.getSignature(queryString);

    const headers = new HttpHeaders({
      'X-MBX-APIKEY': this.apiKey
    });

    return this.http.post(`${this.binanceUrl}/api/v3/order?${queryString}&signature=${signature}`, {}, { headers });
  }
}
