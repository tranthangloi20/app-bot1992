import { Component, OnInit, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable, Subject, EMPTY, of, interval } from 'rxjs';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { map, catchError, distinctUntilChanged, pairwise, tap, delay, first, takeLast, distinct, switchMap } from 'rxjs/operators';

export interface Trade {
  data: {
    p: number,
    s: string,
    t: number,
    v: number
  }[],
  type: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  socket$: WebSocketSubject<any> = webSocket({
    url: 'wss://ws.finnhub.io?token=bsr37a748v6tucpfplbg',
    openObserver: {
      next: () => {
        this.socket$.next({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' });
      }
    },
  });
  price$!: Observable<any>;
  direction$: Observable<any> = of('green');

  ngOnInit() {
    this.price$ = this.getLatestPrice();
    // this.direction$ = this.getDirection();
  }

  getLatestPrice() {
    return this.socket$.pipe(
      map((t: Trade) => t.type === 'trade' && t.data[0].p.toFixed()),
      distinctUntilChanged(),
      tap(d => console.log(d)),
      catchError(_ => EMPTY)
    )
  }

  getDirection() {
    return this.getLatestPrice().pipe(
      pairwise(),
      // tap(d => {
      //   console.log(`Current val ${d[1]} > ${d[0]} `, d[1] > d[0])
      // }),
      map(arr => arr[0] < arr[1] ? 'green' : 'red')
    )
  }

}
