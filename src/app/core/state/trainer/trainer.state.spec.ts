import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@core/services/auth.service';
import { TrainerService } from '@core/services/trainer.service';
import { TrainerLogin, TrainerLogout, TrainerReset } from '@core/state/trainer/trainer.actions';
import { Trainer } from '@core/state/trainer/trainer.model';
import { TrainerState } from '@core/state/trainer/trainer.state';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';

describe('TrainerState', () => {
  let authService: AuthService;
  let trainerService: TrainerService;
  let store: Store;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TrainerState]), RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, TrainerService],
    });

    authService = TestBed.inject(AuthService);
    trainerService = TestBed.inject(TrainerService);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should register given token and load current trainer upon login', () => {
    const token = 'lorem';
    const trainer: Trainer = {
      id: 1,
      name: 'toto',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const authServiceLoginSpy = jest.spyOn(authService, 'login').mockReturnValue(void 0);
    const trainerServiceGetMeSpy = jest.spyOn(trainerService, 'getMe').mockReturnValue(of(trainer));

    expect(store.selectSnapshot(TrainerState.trainer)).toBeUndefined();
    expect(store.selectSnapshot(TrainerState.status)).toBe('connecting');
    expect(authServiceLoginSpy).not.toHaveBeenCalled();
    expect(trainerServiceGetMeSpy).not.toHaveBeenCalled();

    store.dispatch(new TrainerLogin(token));

    expect(authServiceLoginSpy).toHaveBeenCalledWith(token);
    expect(trainerServiceGetMeSpy).toHaveBeenCalled();

    expect(store.selectSnapshot(TrainerState.trainer)).toBe(trainer);
    expect(store.selectSnapshot(TrainerState.status)).toBe('connected');
  });

  it('should clear token and redirect to login page upon logout', () => {
    const trainer: Trainer = {
      id: 1,
      name: 'toto',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const authServiceLogoutSpy = jest.spyOn(authService, 'logout').mockReturnValue(void 0);
    const routerNavigate = jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));

    store.reset({
      ...store.snapshot(),
      trainer: {
        status: 'connected',
        trainer,
      },
    });

    expect(store.selectSnapshot(TrainerState.trainer)).toBe(trainer);
    expect(store.selectSnapshot(TrainerState.status)).toBe('connected');
    expect(authServiceLogoutSpy).not.toHaveBeenCalled();
    expect(routerNavigate).not.toHaveBeenCalled();

    store.dispatch(new TrainerLogout());

    expect(authServiceLogoutSpy).toHaveBeenCalledWith();
    expect(routerNavigate).toHaveBeenCalled();

    expect(store.selectSnapshot(TrainerState.trainer)).toBeUndefined();
    expect(store.selectSnapshot(TrainerState.status)).toBe('disconnected');
  });

  it('should call trainer service reset and reload the page', (done) => {
    const trainerServiceResetSpy = jest.spyOn(trainerService, 'reset').mockReturnValue(of({}));
    const reloadSpy = jest.fn();

    // Mock window.location.reload with a spy
    const originalLocation = window.location;
    const newLocation = Object.assign({}, originalLocation, {
      reload: reloadSpy,
    });
    Object.defineProperty(window, 'location', { value: newLocation });

    store.dispatch(new TrainerReset()).subscribe(() => {
      expect(trainerServiceResetSpy).toHaveBeenCalled();
      expect(window.location.reload).toHaveBeenCalled();

      // Restore the original window.location object
      Object.defineProperty(window, 'location', { value: originalLocation });

      done();
    });
  });
});
