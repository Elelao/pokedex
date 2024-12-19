import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private localStorageTokenKey = 'trainer-token';

  /**
   * Stores the trainer token in persistent storage
   */
  login(token: string) {
    localStorage.setItem(this.localStorageTokenKey, token);
  }

  /**
   * Remove the trainer token from persistent storage
   */
  logout() {
    localStorage.removeItem(this.localStorageTokenKey);
  }

  /**
   * Retrieves the trainer token from persistent storage
   */
  getToken() {
    return localStorage.getItem(this.localStorageTokenKey);
  }
}
