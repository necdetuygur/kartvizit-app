import { Service, computed, signal } from '@angular/core';

import { Card } from '../models/card';

const STORAGE_KEY = 'cards';

@Service()
export class CardService {
  readonly cards = signal<Card[]>(this.load());
  private readonly filterQuery = signal('');

  readonly filteredCards = computed(() => {
    const query = this.filterQuery();
    if (!query) {
      return this.cards();
    }
    return this.cards().filter(
      (card) =>
        card.name.toLowerCase().indexOf(query) > -1 ||
        card.title.toLowerCase().indexOf(query) > -1 ||
        card.phone.toLowerCase().indexOf(query) > -1 ||
        card.email.toLowerCase().indexOf(query) > -1 ||
        card.address.toLowerCase().indexOf(query) > -1
    );
  });

  add(card: Card): void {
    card.id = new Date().getTime();
    this.cards.update((items) => [...items, card]);
    this.persist();
  }

  remove(id: number): void {
    this.cards.update((items) => items.filter((item) => item.id !== id));
    this.persist();
  }

  update(id: number, card: Card): void {
    this.remove(id);
    card.id = id;
    this.cards.update((items) => [...items, card]);
    this.persist();
  }

  filter(query: string): void {
    this.filterQuery.set(query.toLowerCase());
  }

  private load(): Card[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Card[];
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cards()));
  }
}
