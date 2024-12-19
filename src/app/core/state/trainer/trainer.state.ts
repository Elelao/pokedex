import { inject, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { TrainerService } from '@core/services/trainer.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

import { TrainerLogin, TrainerLogout, TrainerReset } from './trainer.actions';
import { TrainerStateModel } from './trainer.model';

@State<TrainerStateModel>({
  name: 'trainer',
  defaults: {
    status: 'connecting',
    trainer: void 0,
  },
})
@Injectable()
export class TrainerState {
  trainerService = inject(TrainerService);
  authService = inject(AuthService);
  router = inject(Router);
  zone = inject(NgZone);

  @Selector()
  static trainer(state: TrainerStateModel) {
    return state.trainer;
  }

  @Selector()
  static status(state: TrainerStateModel) {
    return state.status;
  }

  @Action(TrainerLogin)
  trainerLogin(ctx: StateContext<TrainerStateModel>, { token }: TrainerLogin) {
    ctx.patchState({ status: 'connecting' });

    this.authService.login(token);
    return this.trainerService
      .getMe()
      .pipe(tap((trainer) => ctx.patchState({ status: 'connected', trainer })));
  }

  @Action(TrainerLogout)
  trainerLogout(ctx: StateContext<TrainerStateModel>) {
    ctx.patchState({ status: 'disconnected', trainer: void 0 });

    this.authService.logout();
    void this.zone.run(() => this.router.navigate(['login']));
  }

  @Action(TrainerReset)
  trainerReset() {
    return this.trainerService.reset().pipe(
      tap(() => {
        window.location.reload();
      }),
    );
  }
}
