import { TestBed } from '@angular/core/testing';

import { CardItemComponent } from './card-item.component';

describe('CardItemComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardItemComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CardItemComponent);
    fixture.componentRef.setInput('card', {
      id: 1,
      name: 'Test Ad',
      title: 'Test Unvan',
      phone: '1234567890',
      email: 'test@example.com',
      address: 'Test Adres',
    });
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
