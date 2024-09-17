import { Component, OnInit } from '@angular/core';
import { BinanceService } from '../../services/index';

@Component({
  selector: 'app-buy-sell',
  standalone: true,
  imports: [],
  templateUrl: './buy-sell.component.html',
  styleUrl: './buy-sell.component.scss'
})
export class BuySellComponent implements OnInit {

  constructor(
    private binanceService: BinanceService,
  ) {

  }

  ngOnInit() {
    this.getAccountInfo();
  }

  public getAccountInfo(): void {
    this.binanceService.getAccountInfo().subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }

  public buy(): void {
    this.binanceService.buy('BTCUSDT', 0.01, 25000).subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }

  public sell(): void {
    this.binanceService.sell('BTCUSDT', 0.01, 30000).subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }
}
