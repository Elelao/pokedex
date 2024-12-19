import { AuthService } from '@core/services/auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('writes token to localstorage on login', () => {
    const token = 'lorem';
    const localStorageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    expect(localStorageSetItemSpy).not.toHaveBeenCalled();

    authService.login(token);

    expect(localStorageSetItemSpy).toHaveBeenCalledWith(expect.anything(), token);
  });

  it('removes token to localstorage on login', () => {
    const localStorageRemoveItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    expect(localStorageRemoveItemSpy).not.toHaveBeenCalled();

    authService.logout();

    expect(localStorageRemoveItemSpy).toHaveBeenCalled();
  });

  it('reads token to localstorage on getToken', () => {
    const token = 'lorem';
    const localStorageGetItemSpy = jest.spyOn(Storage.prototype, 'getItem');

    authService.login(token);

    expect(localStorageGetItemSpy).not.toHaveBeenCalled();

    const receivedToken = authService.getToken();

    expect(localStorageGetItemSpy).toHaveBeenCalled();
    expect(receivedToken).toBe(token);
  });
});
