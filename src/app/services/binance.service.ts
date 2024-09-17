import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class BinanceService {
  // https://testnet.binance.vision/
  // https://www.binance.com/en/support/faq/how-to-test-my-functions-on-binance-testnet-ab78f9a1b8824cf0a106b4229c76496d

  private apiKey: string = 'ApvLNChpC4AxfcodgAyGhJPSdo7lVeES5ALhv8ubAOjkqZrQPA1HVyq6BvtaHIn2';
  private apiSecret: string = '8xrgvBysRvPLHQ0RmQQyte5B01NCnWY4VM2H9yn1pouUSnlmq6N0AV2pHvyjokw7';
  private baseUrl: string = 'https://testnet.binance.vision/api';

  // private apiKey = 'YOUR_BINANCE_API_KEY';
  // private apiSecret = 'YOUR_BINANCE_API_SECRET';
  // private binanceUrl = 'https://api.binance.com';

  constructor(private http: HttpClient) { }

  private signParams(params: any): string {
    const queryString = new URLSearchParams(params).toString();
    return CryptoJS.HmacSHA256(queryString, this.apiSecret).toString(CryptoJS.enc.Hex);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-MBX-APIKEY': this.apiKey
    });
  }

  public getAccountInfo(): Observable<any> {
    const endpoint = '/api/v3/account';
    const params: any = { timestamp: Date.now() };
    const signature = this.signParams(params);
    params['signature'] = signature;

    return this.http.get<any>(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
      params: params
    });
  }

  public buy(symbol: string, quantity: number, price: number): Observable<any> {
    const endpoint = '/api/v3/order';
    const params: any = {
      symbol: symbol,
      side: 'BUY',
      type: 'LIMIT',
      timeInForce: 'GTC',
      quantity: quantity,
      price: price,
      timestamp: Date.now()
    };
    const signature = this.signParams(params);
    params['signature'] = signature;

    return this.http.post<any>(`${this.baseUrl}${endpoint}`, null, {
      headers: this.getHeaders(),
      params: params
    });
  }

  public sell(symbol: string, quantity: number, price: number): Observable<any> {
    const endpoint = '/api/v3/order';
    const params: any = {
      symbol: symbol,
      side: 'SELL',
      type: 'LIMIT',
      timeInForce: 'GTC',
      quantity: quantity,
      price: price,
      timestamp: Date.now()
    };
    const signature = this.signParams(params);
    params['signature'] = signature;

    return this.http.post<any>(`${this.baseUrl}${endpoint}`, null, {
      headers: this.getHeaders(),
      params: params
    });
  }
}
