import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { CardModalComponent } from './card-modal.component';

describe('CardModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModalComponent, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: MAT_DIALOG_DATA, useValue: undefined },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CardModalComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
