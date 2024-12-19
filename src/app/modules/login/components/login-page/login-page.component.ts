import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { TrainerLogin, TrainerState } from '@core/state/trainer';
import { environment } from '@environment';
import { Store } from '@ngxs/store';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgOptimizedImage,
  ],
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnDestroy {
  store = inject(Store);
  router = inject(Router);

  tokenControl = new FormControl('', Validators.required);
  isDisplayToken = false;
  isInvalidToken = false;
  isConnecting = false;

  registerUrl = environment.registerUrl;

  private hasSubmitted = false;

  private readonly trainerStatusSubscription = this.store
    .select(TrainerState.status)
    .subscribe((status) => {
      this.isConnecting = status === 'connecting';
      this.isInvalidToken = status === 'disconnected' && this.hasSubmitted;

      if (status === 'connected') {
        void this.router.navigate(['/']);
        return;
      }
    });

  ngOnDestroy() {
    this.trainerStatusSubscription.unsubscribe();
  }

  onSubmit() {
    if (!this.tokenControl.value) {
      return;
    }

    this.hasSubmitted = true;
    this.store.dispatch(new TrainerLogin(this.tokenControl.value));
  }
}
