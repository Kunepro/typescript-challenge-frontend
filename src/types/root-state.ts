import { RouterReducerState } from '@ngrx/router-store'
import { StateRouter } from './state-router'
import { StoreFeature } from './store-feature'
import { TransitLinesState } from './transit-line-state'

export interface RootState {
  readonly [StoreFeature.TransitLines]: TransitLinesState,
  readonly [StoreFeature.Router]: RouterReducerState<StateRouter>
}
