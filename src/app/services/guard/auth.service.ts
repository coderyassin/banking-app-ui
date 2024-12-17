import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    const token = this.getCookie('jwt_cookie');

    if (!token) {
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token validation error', error);
      return false;
    }
  }

  private getCookie(name: string): string | null {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`));

    return cookieValue
      ? cookieValue.split('=')[1]
      : null;
  }

  hasAuthority(authority: string): boolean {
    const authorities = this.getUserAuthorities();
    return authorities.includes(authority);
  }

  getUserAuthorities(): string[] {
    const token = this.getCookie('jwt_cookie');

    if (!token) {
      return [];
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.authorities || [];
    } catch (error) {
      console.error('Error retrieving permissions', error);
      return [];
    }
  }
}
