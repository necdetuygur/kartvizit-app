import { Injectable } from '@angular/core';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cards: Card[] = JSON.parse(localStorage.getItem('cards') || '[]');
  constructor() {}

  Get(): Card[] {
    return this.cards;
  }

  Add(card: Card) {
    card.id = new Date().getTime();
    this.cards.push(card);
    localStorage.setItem('cards', JSON.stringify(this.cards));
  }

  Remove(id: number) {
    this.cards = this.cards.filter((item) => item.id !== id);
    localStorage.setItem('cards', JSON.stringify(this.cards));
  }

  Update(id: number, card: Card) {
    this.Remove(id);
    card.id = id;
    this.cards.push(card);
    localStorage.setItem('cards', JSON.stringify(this.cards));
  }
}
