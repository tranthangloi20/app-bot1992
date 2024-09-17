import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BinanceSocketService {
  private wsSubject!: WebSocketSubject<any>;

  constructor() {
    this.connect();
  }

  private connect(): void {
    // Kết nối tới WebSocket của Binance (hoặc các dịch vụ tương tự)
    this.wsSubject = new WebSocketSubject('wss://stream.binance.com:9443/ws');
  }

  // Hàm để bắt đầu theo dõi giá cho một danh sách coins
  trackCoins(coinSymbols: string[]): Observable<any> {
    // Tạo một subscribe cho từng coin trong danh sách
    coinSymbols.forEach((symbol) => {
      const msg = {
        method: "SUBSCRIBE",
        params: [`${symbol.toLowerCase()}usdt@miniTicker`], // Theo dõi cặp coin/USDT
        id: new Date().getTime(),  // id duy nhất
      };
      this.wsSubject.next(msg);
    });

    // Trả về Observable stream theo dõi sự kiện từ WebSocket
    return this.wsSubject.pipe(
      map((data: any) => {
        return {
          symbol: data.s,   // Ký hiệu coin
          price: data.c,    // Giá hiện tại
          change: data.P,   // Thay đổi phần trăm
        };
      })
    );
  }

  // Ngắt kết nối
  closeConnection(): void {
    if (this.wsSubject) {
      this.wsSubject.complete();
    }
  }
}
