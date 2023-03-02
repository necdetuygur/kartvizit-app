import { Injectable } from '@angular/core';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cards: Card[] = JSON.parse(localStorage.getItem('cards') || '[]');
  public filteredCards: Card[] = this.cards;

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

  Filter(query: string) {
    query = query.toLowerCase();
    this.filteredCards = this.cards.filter((card) => {
      return (
        card.name.toLowerCase().indexOf(query) > -1 ||
        card.title.toLowerCase().indexOf(query) > -1 ||
        card.phone.toLowerCase().indexOf(query) > -1 ||
        card.email.toLowerCase().indexOf(query) > -1 ||
        card.address.toLowerCase().indexOf(query) > -1
      );
    });
  }
}
