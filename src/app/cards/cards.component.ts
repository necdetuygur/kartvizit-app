import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CardItemComponent } from './card-item/card-item.component';
import { CardModalComponent } from './card-modal/card-modal.component';
import { CardSearchComponent } from './card-search/card-search.component';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-cards',
  imports: [MatButtonModule, MatDialogModule, CardItemComponent, CardSearchComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  protected readonly cardService = inject(CardService);
  protected readonly loading = signal(false);

  private readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(CardModalComponent);
  }
}
