import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TrainerReset } from '@core/state/trainer';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    A11yModule,
  ],
  selector: 'app-trainer-reset-modal',
  templateUrl: 'trainer-reset-modal.component.html',
  styleUrls: ['trainer-reset-modal.component.scss'],
})
export class TrainerResetModalComponent {
  store = inject(Store);
  dialogRef = inject(MatDialogRef<TrainerResetModalComponent>);

  isLoading = false;

  confirmReset() {
    this.isLoading = true;
    return this.store.dispatch(new TrainerReset()).pipe(
      tap(() => {
        this.isLoading = false;
        this.dialogRef.close();
      }),
    );
  }
}
