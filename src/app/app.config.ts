import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideRouterStore, RouterState } from '@ngrx/router-store'
import { provideStore } from '@ngrx/store'
import { effects, reducers } from 'src/store/app.store'
import { CustomRouterSerialiser } from '../store/custom-router-serialiser'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(reducers),
    provideEffects(effects),
    provideRouterStore({
      serializer: CustomRouterSerialiser,
      routerState: RouterState.Minimal,
    }),
  ],
}
