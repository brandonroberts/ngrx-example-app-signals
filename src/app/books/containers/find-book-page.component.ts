import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { FindBookPageActions } from '@example-app/books/actions';
import * as fromBooks from '@example-app/books/reducers';

@Component({
  selector: 'bc-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-search
      [query]="(searchQuery$ | async)!"
      [searching]="vm().loading"
      [error]="vm().error"
      (search)="search($event)"
    >
    </bc-book-search>
    
    <bc-book-preview-list [books]="vm().books"> </bc-book-preview-list>
  `,
})
export class FindBookPageComponent {
  searchQuery$: Observable<string>;

  vm = computed(() => {
    const books = this.store.selectSignal(fromBooks.selectSearchResults);
    const loading =  this.store.selectSignal(fromBooks.selectSearchLoading);
    const error = this.store.selectSignal(fromBooks.selectSearchError);

    return {
      books: books(),
      loading: loading(),
      error: error()
    };
  });

  constructor(private store: Store) {
    this.searchQuery$ = store.select(fromBooks.selectSearchQuery).pipe(take(1));
  }

  search(query: string) {
    this.store.dispatch(FindBookPageActions.searchBooks({ query }));
  }
}
