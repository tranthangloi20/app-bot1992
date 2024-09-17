import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';

import {
  FinnhubSocketService,
  BinanceSocketService,
} from '../../services/index';

import {
  MessagesComponent,
  BuySellComponent,
} from '../../components/index';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MessagesComponent,
    BuySellComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  public price$: Observable<any> = of('0');
  public direction$: Observable<any> = of('green');

 


  coins: { symbol: string; price: number; change: number }[] = [];
  private subscription!: Subscription;

  constructor(
    private finnhubSocketService: FinnhubSocketService,
    private binanceSocketService: BinanceSocketService,
  ) {

  }

  ngOnInit() {
    this.price$ = this.finnhubSocketService.getLatestPrice();
    this.direction$ = this.finnhubSocketService.getDirection();

    


    const coinList = ['btc', 'eth', 'bnb']; // Danh sách coins theo dõi

    this.subscription = this.binanceSocketService
      .trackCoins(coinList)
      .subscribe((coinData) => {
        // Cập nhật giá coin vào danh sách hiển thị
        const index = this.coins.findIndex(c => c.symbol === coinData.symbol);
        if (index > -1) {
          this.coins[index] = coinData; // Cập nhật nếu đã có trong danh sách
        } else {
          this.coins.push(coinData); // Thêm coin mới vào danh sách
        }
        // console.log(coinData);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
