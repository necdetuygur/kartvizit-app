import { Injectable } from '@angular/core';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cards: Card[] = JSON.parse(localStorage.getItem('cards') || '[]');

  private filterQuery: string = '';
  public filteredCards: Card[] = this.cards;

  constructor() {}

  Get(): Card[] {
    return this.cards;
  }

  Add(card: Card) {
    card.id = new Date().getTime();
    this.cards.push(card);
    this.Reload();
  }

  Remove(id: number) {
    this.cards = this.cards.filter((item) => item.id !== id);
    this.Reload();
  }

  Update(id: number, card: Card) {
    this.Remove(id);
    card.id = id;
    this.cards.push(card);
    this.Reload();
  }

  Filter(query: string) {
    this.filterQuery = query.toLowerCase();
    this.filteredCards = this.cards.filter((card) => {
      return (
        card.name.toLowerCase().indexOf(this.filterQuery) > -1 ||
        card.title.toLowerCase().indexOf(this.filterQuery) > -1 ||
        card.phone.toLowerCase().indexOf(this.filterQuery) > -1 ||
        card.email.toLowerCase().indexOf(this.filterQuery) > -1 ||
        card.address.toLowerCase().indexOf(this.filterQuery) > -1
      );
    });
  }

  private Reload() {
    localStorage.setItem('cards', JSON.stringify(this.cards));
    this.filteredCards = this.cards;
    this.Filter(this.filterQuery);
  }
}
