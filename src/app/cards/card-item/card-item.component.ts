import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import { Card } from '../../models/card';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-item',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent {
  readonly card = input.required<Card>();

  private readonly dialog = inject(MatDialog);
  private readonly cardService = inject(CardService);

  openDialog(card: Card): void {
    this.dialog.open(CardModalComponent, { data: card });
  }

  remove(id: number): void {
    this.cardService.remove(id);
  }
}
