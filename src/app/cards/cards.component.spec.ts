import { TestBed } from '@angular/core/testing';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CardsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
