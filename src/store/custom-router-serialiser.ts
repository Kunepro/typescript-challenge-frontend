import { RouterStateSnapshot } from '@angular/router'
import { RouterStateSerializer } from '@ngrx/router-store'
import { AppParams } from '../types/app-params'
import { StateRouter } from '../types/state-router'

export class CustomRouterSerialiser implements RouterStateSerializer<StateRouter> {
  serialize(routerState: RouterStateSnapshot): StateRouter {
    let route = routerState.root
    const accumulatedParams: AppParams = {}

    while (route) {
      route = route.firstChild
      Object.assign(accumulatedParams, route?.params)
    }

    const url = routerState.url
    const params = accumulatedParams

    return {
      url,
      params,
    }
  }
}
