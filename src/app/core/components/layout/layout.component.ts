import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TrainerResetModalComponent } from '@core/components/trainer-reset-modal/trainer-reset-modal.component';
import { TrainerLogout, TrainerState } from '@core/state/trainer';
import { Store } from '@ngxs/store';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    AsyncPipe,
    NgIf,
    MatDialogModule,
  ],
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  store = inject(Store);
  dialog = inject(MatDialog);

  trainer$ = this.store.select(TrainerState.trainer);

  logout() {
    this.store.dispatch(new TrainerLogout());
  }

  reset() {
    this.dialog.open(TrainerResetModalComponent);
  }
}
