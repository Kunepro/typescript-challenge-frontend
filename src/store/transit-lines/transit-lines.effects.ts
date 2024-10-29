import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { u9 } from '../../constants/u9'
import { TransitLinesActions } from './transit-lines.actions'

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

  // In this case we could initialise the data loading with the ROOT_EFFECTS_INIT action, which will dispatch the
  // loadLines action, personally I find it a bit over-engineer, and it's a lot of extra code for nothing, it's more
  // descriptive when analysing the code with the Redux DevTools, but personally I would use it to start
  // the loading process directly.

  // Using ROOT_EFFECTS_INIT here ensures this effect runs as soon as NgRx Effects initialize.
  // Alternatives include:
  // 1. Dispatching a dedicated `AppInit` or `FeatureInit`action from a high-level component, which could coordinate
  //    other initializations.
  // 2. Use one of the other NgRx lifecycle hooks, like `onRunEffects` or `onInitEffects`, to trigger the effect.
  // ... And there are several other possible approaches, like from the main.ts file or others, but for this context
  // this is a good approach.
  initLoadLines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => TransitLinesActions.loadLines())
    )
  )

  loadLines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransitLinesActions.loadLines),
      switchMap(() =>
        // Example http request, commented out for the sake of this challenge
        // return this.http.get<TransitLine[]>('https://api.example.com/transit/berlin/lines').pipe(
        of([u9]).pipe(
          map((lines) => TransitLinesActions.loadLinesSuccess({ lines })),
          // It is debatable how to handle errors, logging them with a tool like Sentry is a good idea,
          // but for the sake of this challenge, we will just log them to the console
          catchError((error) => of(TransitLinesActions.loadLinesFailure({ error })))
        )
      )
    )
  )

  constructor(
    private readonly actions$: Actions
    // private readonly http: HttpClient
  ) {}
}
