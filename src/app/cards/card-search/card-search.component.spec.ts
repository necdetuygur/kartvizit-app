import { TestBed } from '@angular/core/testing';

import { CardSearchComponent } from './card-search.component';

describe('CardSearchComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSearchComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CardSearchComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
