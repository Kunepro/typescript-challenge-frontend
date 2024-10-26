import { routerReducer } from '@ngrx/router-store'
import { ActionReducerMap } from '@ngrx/store'
import { RootState } from '../types/root-state'
import { StoreFeature } from '../types/store-feature'
import { TransitLinesEffects } from './transit-lines/transit-lines.effects'
import { transitLinesReducer } from './transit-lines/transit-lines.reducer'

export const reducers: ActionReducerMap<RootState> = {
  [StoreFeature.TransitLines]: transitLinesReducer,
  [StoreFeature.Router]: routerReducer,
}

export const effects = [TransitLinesEffects]
