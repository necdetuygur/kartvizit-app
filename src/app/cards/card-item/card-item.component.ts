import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { CardModalComponent } from '../card-modal/card-modal.component';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input() card!: Card;
  constructor(private cardService: CardService, private dialog: MatDialog) {}
  openDialog(c: Card) {
    this.dialog.open(CardModalComponent, { data: c });
  }
  remove(id: number) {
    this.cardService.Remove(id);
  }
}
