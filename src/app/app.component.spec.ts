import { TestBed } from '@angular/core/testing';
import { AuthService } from '@core/services/auth.service';
import { TrainerLogin, TrainerLogout } from '@core/state/trainer';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let authService: AuthService;
  let store: Store;
  let storeDispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [AppComponent],
    });

    authService = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
    storeDispatchSpy = jest.spyOn(store, 'dispatch').mockReturnValue(of());
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should dispatch login if token available', () => {
    const token = 'abc';
    const getTokenSpy = jest.spyOn(authService, 'getToken').mockReturnValue(token);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(getTokenSpy).toHaveBeenCalled();

    const action = new TrainerLogin(token);
    expect(storeDispatchSpy).toHaveBeenCalledWith(action);
  });

  it('should dispatch logout if token not available', () => {
    const getTokenSpy = jest.spyOn(authService, 'getToken').mockReturnValue(null);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(getTokenSpy).toHaveBeenCalled();

    const action = new TrainerLogout();
    expect(storeDispatchSpy).toHaveBeenCalledWith(action);
  });
});
