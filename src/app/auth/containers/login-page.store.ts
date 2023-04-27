import { computed, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable, exhaustMap } from 'rxjs';
import { Router } from '@angular/router';

import { Credentials } from '@example-app/auth/models';
import { AuthApiActions } from '@example-app/auth/actions';
import { AuthService } from '../services/auth.service';

interface LoginPageState {
  pending: boolean;
  error: string | null;
}

const initialState: LoginPageState = {
  pending: false,
  error: null,
};

@Injectable()
export class LoginPageStore extends ComponentStore<LoginPageState> {
  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {
    super(initialState);
  }

  readonly pending = this.selectSignal((s) => s.pending);
  readonly error = computed(() => this.state().error);

  login = this.effect((credentials$: Observable<Credentials>) => {
    return credentials$.pipe(
      exhaustMap((auth: Credentials) => {
        this.setState({
          pending: true,
          error: null
        });
        return this.authService.login(auth).pipe(
          tapResponse(
            (user) => {
              this.setState({
                error: null,
                pending: false,
              });
              this.store.dispatch(AuthApiActions.loginSuccess({ user }));
              this.router.navigate(['/']);
            },
            (error: string) => {
              this.setState({
                error,
                pending: false,
              });
            }
          )
        );
      })
    );
  });
}
