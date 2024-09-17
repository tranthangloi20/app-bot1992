import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError, distinctUntilChanged, pairwise, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})

export class FinnhubSocketService {

  private socketURL: string = 'wss://ws.finnhub.io?token=bsr37a748v6tucpfplbg';

  private socket$: WebSocketSubject<any> = webSocket({
    url: this.socketURL,
    openObserver: {
      next: () => {
        this.socket$.next({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' });
      }
    },
  });

  public getLatestPrice(): Observable<any> {
    return this.socket$.pipe(
      map((t: Trade) => t.type === 'trade' && t.data[0].p.toFixed()),
      distinctUntilChanged(),
      // tap(d => console.log(d)),
      catchError(_ => EMPTY)
    )
  }

  public getDirection(): Observable<any> {
    return this.getLatestPrice().pipe(
      pairwise(),
      // tap(d => {
      //   console.log(`Current val ${d[1]} > ${d[0]} `, d[1] > d[0])
      // }),
      map(arr => arr[0] < arr[1] ? 'green' : 'red')
    )
  }
}

export interface Trade {
  data: {
    p: number,
    s: string,
    t: number,
    v: number
  }[],
  type: string
}