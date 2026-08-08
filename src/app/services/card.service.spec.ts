import { TestBed } from '@angular/core/testing';

import { Card } from '../models/card';
import { CardService } from './card.service';

function makeCard(overrides: Partial<Card> = {}): Card {
  return {
    id: 0,
    name: 'Test Ad',
    title: 'Test Unvan',
    phone: '1234567890',
    email: 'test@example.com',
    address: 'Test Adres',
    ...overrides,
  };
}

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardService);
  });

  it('should start with an empty list', () => {
    expect(service.cards()).toEqual([]);
  });

  it('should add a card with an auto-generated timestamp id', () => {
    service.add(makeCard({ name: 'Ahmet' }));
    expect(service.cards().length).toBe(1);
    expect(service.cards()[0].name).toBe('Ahmet');
    expect(service.cards()[0].id).toBeGreaterThan(0);
  });

  it('should remove a card by id', () => {
    service.add(makeCard());
    const id = service.cards()[0].id;
    service.remove(id);
    expect(service.cards()).toEqual([]);
  });

  it('should update a card and preserve its original id', () => {
    service.add(makeCard({ name: 'Eski Ad' }));
    const id = service.cards()[0].id;
    service.update(id, makeCard({ name: 'Yeni Ad' }));
    expect(service.cards().length).toBe(1);
    expect(service.cards()[0].id).toBe(id);
    expect(service.cards()[0].name).toBe('Yeni Ad');
  });

  it('should filter cards case-insensitively across all fields', () => {
    service.add(makeCard({ id: 0, name: 'Ahmet Yılmaz', title: 'Mühendis', phone: '555', email: '', address: '' }));
    service.add(makeCard({ id: 0, name: 'Ayşe', title: 'Doktor', phone: '111', email: '', address: '' }));

    service.filter('ahmet');
    expect(service.filteredCards().length).toBe(1);
    expect(service.filteredCards()[0].name).toBe('Ahmet Yılmaz');

    service.filter('DOKTOR');
    expect(service.filteredCards().length).toBe(1);
    expect(service.filteredCards()[0].name).toBe('Ayşe');

    service.filter('555');
    expect(service.filteredCards().length).toBe(1);
    expect(service.filteredCards()[0].name).toBe('Ahmet Yılmaz');
  });

  it('should return all cards for an empty query', () => {
    service.add(makeCard());
    service.add(makeCard());
    service.filter('');
    expect(service.filteredCards().length).toBe(2);
  });

  it('should keep the active filter after a card is added', () => {
    service.add(makeCard({ name: 'Ahmet' }));
    service.add(makeCard({ name: 'Mehmet' }));
    service.filter('ahmet');
    expect(service.filteredCards().length).toBe(1);

    service.add(makeCard({ name: 'Ahmet Kaya' }));
    expect(service.filteredCards().length).toBe(2);
  });

  it('should keep the active filter after a card is removed', () => {
    service.add(makeCard({ name: 'Ahmet' }));
    service.add(makeCard({ name: 'Ahmet Kaya' }));
    service.add(makeCard({ name: 'Mehmet' }));
    service.filter('ahmet');
    expect(service.filteredCards().length).toBe(2);

    service.remove(service.cards()[0].id);
    expect(service.filteredCards().length).toBe(1);
  });

  it('should persist cards to localStorage', () => {
    service.add(makeCard({ name: 'Kalıcı Kayıt' }));
    const stored = JSON.parse(localStorage.getItem('cards') || '[]') as Card[];
    expect(stored.length).toBe(1);
    expect(stored[0].name).toBe('Kalıcı Kayıt');
  });

  it('should load existing cards from localStorage', () => {
    const stored: Card[] = [makeCard({ id: 1, name: 'Önceden Kayıtlı' })];
    localStorage.setItem('cards', JSON.stringify(stored));

    const fresh = new CardService();
    expect(fresh.cards().length).toBe(1);
    expect(fresh.cards()[0].name).toBe('Önceden Kayıtlı');
  });
});
