import { RouterReducerState } from '@ngrx/router-store'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppParams } from '../../types/app-params'
import { StateRouter } from '../../types/state-router'
import { StoreFeature } from '../../types/store-feature'

const selectRouterState = createFeatureSelector<RouterReducerState<StateRouter> | undefined>(StoreFeature.Router)

export const selectRouterStateSerialisedState = createSelector(
  selectRouterState,
  (routerState: RouterReducerState<StateRouter> | undefined): StateRouter | undefined => routerState?.state
)

export const selectQueryParams = createSelector(
  selectRouterStateSerialisedState,
  (routerState: StateRouter | undefined): AppParams | undefined => routerState && routerState.params
)
