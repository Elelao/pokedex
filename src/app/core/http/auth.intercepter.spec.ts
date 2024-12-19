import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from '@core/http/auth.interceptor';
import { AuthService } from '@core/services/auth.service';
import { TrainerLogout } from '@core/state/trainer';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable, of, throwError } from 'rxjs';

describe('AuthIntercepter', () => {
  let authService: AuthService;
  let store: Store;
  let storeDispatchSpy: jest.SpyInstance;
  let authInterceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
      providers: [AuthInterceptor, AuthService],
    });

    authService = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
    storeDispatchSpy = jest.spyOn(store, 'dispatch').mockReturnValue(of());
    authInterceptor = TestBed.inject(AuthInterceptor);
  });

  it('should inject token as bearer', () => {
    expect.assertions(1);

    const token = 'abc';
    jest.spyOn(authService, 'getToken').mockReturnValue(token);

    const next: HttpHandler = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.get('Authorization')).toBe(`Bearer ${token}`);
        return of();
      },
    };

    const requestMock = new HttpRequest('GET', '/test');
    authInterceptor.intercept(requestMock, next);
  });

  it('should logout if no token available', () => {
    expect.assertions(1);

    jest.spyOn(authService, 'getToken').mockReturnValue(null);

    const next: HttpHandler = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handle: (_: HttpRequest<any>): Observable<HttpEvent<any>> => {
        return of();
      },
    };

    const requestMock = new HttpRequest('GET', '/test');
    authInterceptor.intercept(requestMock, next).subscribe(() => {
      // noop
    });

    const action = new TrainerLogout();
    expect(storeDispatchSpy).toHaveBeenCalledWith(action);
  });

  it('should logout upon 401 error status', () => {
    expect.assertions(1);

    const token = 'abc';
    jest.spyOn(authService, 'getToken').mockReturnValue(token);

    const next: HttpHandler = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handle: (_: HttpRequest<any>): Observable<HttpEvent<any>> => {
        return throwError(() => new HttpErrorResponse({ status: 401 }));
      },
    };

    const requestMock = new HttpRequest('GET', '/test');
    authInterceptor.intercept(requestMock, next).subscribe(() => {
      // noop
    });

    const action = new TrainerLogout();
    expect(storeDispatchSpy).toHaveBeenCalledWith(action);
  });
});
