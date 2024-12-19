import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@core/services/auth.service';
import { TrainerService } from '@core/services/trainer.service';
import { TrainerLogin, TrainerState } from '@core/state/trainer';
import { LoginPageComponent } from '@modules/login/components/login-page/login-page.component';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';

describe('LoginPageComponent', () => {
  let store: Store;
  let router: Router;
  let storeDispatchSpy: jest.SpyInstance;
  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, LoginPageComponent, NgxsModule.forRoot([TrainerState])],
      providers: [
        AuthService,
        {
          provide: TrainerService,
          useValue: { getMe: jest.fn() },
        },
      ],
    });

    store = TestBed.inject(Store);
    router = TestBed.inject(Router);

    store.reset({
      ...store.snapshot(),
      trainer: {
        status: 'disconnected',
        trainer: void 0,
      },
    });
    storeDispatchSpy = jest.spyOn(store, 'dispatch').mockReturnValue(of());

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
  });

  it('should mount', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect connecting status', () => {
    store.reset({
      ...store.snapshot(),
      trainer: {
        status: 'connecting',
        trainer: void 0,
      },
    });

    expect(component.isConnecting).toBe(true);
  });

  it('should redirect to home upon successful login', () => {
    const routerNavigate = jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));

    store.reset({
      ...store.snapshot(),
      trainer: {
        status: 'connected',
        trainer: void 0,
      },
    });

    expect(routerNavigate).toHaveBeenCalledWith(['/']);
  });

  it('should prevent submitting empty token', () => {
    const inputToken = '';
    component.tokenControl.setValue(inputToken);
    component.onSubmit();

    expect(storeDispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch login event upon login', () => {
    const inputToken = 'input';
    component.tokenControl.setValue(inputToken);
    component.onSubmit();

    expect(storeDispatchSpy).toHaveBeenCalledWith(new TrainerLogin(inputToken));
  });

  it('should consider token as invalid if status is disconnected and form has been submitted', () => {
    const inputToken = 'input';
    component.tokenControl.setValue(inputToken);
    component.onSubmit();

    expect(component.isInvalidToken);
  });
});
