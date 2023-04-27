import {
  Component,
  ChangeDetectionStrategy,
  effect,
  Signal,
  Input as RouteInput
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { ViewBookPageActions } from '@example-app/books/actions';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Book Page's responsibility is to map router params
 * to a 'Select' book action. Actually showing the selected
 * book remains a responsibility of the
 * SelectedBookPageComponent
 */
@Component({
  selector: 'bc-view-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <bc-selected-book-page></bc-selected-book-page> `,
})
export class ViewBookPageComponent {
  // id: Signal<string | null | undefined> = toSignal(
  //   this.route.paramMap.pipe(map((params) => params.get('id')))
  // );
  @RouteInput('id') set bookId(id: string) {
    const action = ViewBookPageActions.selectBook({ id });
    this.store.dispatch(action);
  }

  constructor(private store: Store, private route: ActivatedRoute) {
    // effect(() => {
    //   const id = this.id() as string;
    //   const action = ViewBookPageActions.selectBook({ id });
    //   this.store.dispatch(action);
    // }, { allowSignalWrites: true });
  }
}
