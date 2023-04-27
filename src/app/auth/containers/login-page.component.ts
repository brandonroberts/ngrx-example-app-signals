import { Component } from '@angular/core';
import { Credentials } from '@example-app/auth/models';

import { LoginPageStore } from './login-page.store';

@Component({
  selector: 'bc-login-page',
  template: `
    <bc-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending()"
      [errorMessage]="error()"
    >
    </bc-login-form>
  `,
  styles: [],
  providers: [
    LoginPageStore
  ]
})
export class LoginPageComponent {
  pending = this.store.pending;
  error = this.store.error;

  constructor(private store: LoginPageStore) {}

  onSubmit(credentials: Credentials) {
    this.store.login(credentials);
  }
}
