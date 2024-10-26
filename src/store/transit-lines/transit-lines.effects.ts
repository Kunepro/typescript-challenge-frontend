import { Injectable } from '@angular/core'

@Injectable()
export class TransitLinesEffects {
  // Kept for reference, but virtually killed and replaced by an <a routerLink> in the template
  // navigateOnSelect$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(TransitLinesActions.selectStop),
  //       map((action) => (action.selectedStopId ? this.router.navigate(['detail']) : this.router.navigate(['home'])))
  //     ),
  //   { dispatch: false }
  // )
  // constructor(
  //   private actions$: Actions,
  //   private router: Router
  // ) {}
}
