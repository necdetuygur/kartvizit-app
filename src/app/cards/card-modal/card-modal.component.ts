import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormField, FormRoot, email, form, maxLength, required } from '@angular/forms/signals';

import { Card } from '../../models/card';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-modal',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    FormField,
    FormRoot,
  ],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.css',
})
export class CardModalComponent {
  protected readonly data = inject<Card>(MAT_DIALOG_DATA, { optional: true });
  private readonly dialogRef = inject<MatDialogRef<CardModalComponent>>(MatDialogRef);
  private readonly cardService = inject(CardService);

  protected readonly showSpinner = signal(false);

  protected readonly cardForm = form(
    signal({
      name: this.data?.name ?? '',
      title: this.data?.title ?? '',
      phone: this.data?.phone ?? '',
      email: this.data?.email ?? '',
      address: this.data?.address ?? '',
    }),
    (field) => {
      maxLength(field.name, 50);
      required(field.title);
      maxLength(field.title, 255);
      required(field.phone);
      maxLength(field.phone, 20);
      email(field.email);
      maxLength(field.email, 50);
      maxLength(field.address, 255);
    },
  );

  addCard(): void {
    this.showSpinner.set(true);
    this.cardService.add(this.cardForm().value());
    this.dialogRef.close();
    this.showSpinner.set(false);
  }

  updateCard(): void {
    this.showSpinner.set(true);
    this.cardService.update(this.data!.id, this.cardForm().value());
    this.dialogRef.close();
    this.showSpinner.set(false);
  }
}
