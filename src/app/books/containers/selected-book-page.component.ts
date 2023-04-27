import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';

import { Store } from '@ngrx/store';

import { SelectedBookPageActions } from '@example-app/books/actions';
import { Book } from '@example-app/books/models';
import * as fromBooks from '@example-app/books/reducers';

@Component({
  selector: 'bc-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-book-detail
      [book]="book()"
      [inCollection]="isSelectedBookInCollection()"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)"
    >
    </bc-book-detail>
  `,
})
export class SelectedBookPageComponent {
  book: Signal<Book>;
  isSelectedBookInCollection: Signal<boolean>;

  constructor(private store: Store) {
    this.book = store.selectSignal(fromBooks.selectSelectedBook) as Signal<Book>;
    this.isSelectedBookInCollection = store.selectSignal(
      fromBooks.isSelectedBookInCollection
    );
  }

  addToCollection(book: Book) {
    this.store.dispatch(SelectedBookPageActions.addBook({ book }));
  }

  removeFromCollection(book: Book) {
    this.store.dispatch(SelectedBookPageActions.removeBook({ book }));
  }
}
