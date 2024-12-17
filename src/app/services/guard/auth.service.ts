import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    return this.getCookie('jwt_cookie') !== null;
  }

  private getCookie(name: string): string | null {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`));

    return cookieValue
      ? cookieValue.split('=')[1]
      : null;
  }
}
