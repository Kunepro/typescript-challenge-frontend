import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map } from 'rxjs/operators'
import { RootState } from '../app.store'
import { TransitLinesActions } from './transit-lines.actions'

@Injectable()
export class TransitLinesEffects {
  navigateOnSelect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransitLinesActions.SelectStop),
        map((action) => (action.selectedStopId ? this.router.navigate(['detail']) : this.router.navigate(['home'])))
      ),
    { dispatch: false }
  )

  constructor(private actions$: Actions, private store: Store<RootState>, private router: Router) {}
}
