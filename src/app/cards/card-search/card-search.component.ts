import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-search',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './card-search.component.html',
  styleUrl: './card-search.component.css',
})
export class CardSearchComponent {
  private readonly cardService = inject(CardService);

  search(query: string): void {
    this.cardService.filter(query);
  }
}
