import { Component } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss'],
})
export class CardSearchComponent {
  constructor(private cardService: CardService) {}
  search(query: string) {
    this.cardService.Filter(query);
  }
}
