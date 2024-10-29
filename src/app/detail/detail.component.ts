import { ChangeDetectionStrategy, Component, Signal } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { TransitLinesActions } from 'src/store/transit-lines/transit-lines.actions'
import * as fromTransitLines from 'src/store/transit-lines/transit-lines.selectors'
import { StopMetrics, TransitStopWithMetrics } from '../../types/line'
import { RootState } from '../../types/root-state'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconButton, MatIcon, RouterLink],
})
export class DetailComponent {
  readonly stopDetails: Signal<TransitStopWithMetrics>
  stopId: string | null = null

  constructor(
    // private route: ActivatedRoute,
    private store: Store<RootState>
  ) {
    // The stopId you can get it either from the store or from the route snapshot, or subscribe to the route
    // params if it was dynamic. As per example:
    // this.stopId = this.route.snapshot.paramMap.get(AppParam.StopId)
    // Of course it becomes useless and redundant if you get the whole object as per below
    this.stopDetails = this.store.selectSignal(fromTransitLines.selectSelectedStopWithMetrics)

    // The advantage of reading from the router and then using it to query the store, instead of expecting it
    // from the store, is that in case this web link is shared or copy-pasted, there is not going to be anything set
    // in the store of a separate browser session, so the store will not have the stopId, and the stopId will be null,
    // but the route will still be able to show the correct stop.
    // That's why instead of expecting the store to have the stopId, I would rather read it from the route, and then I
    // would use that to query the store, maybe triggering an action and effect if necessary.
    // An alternative approach is that on app initialisation you dissect the URL, and then you have a composite selector
    // that combines the router's state of "@ngrx/router-store" and the custom app store to get the stopId and all
    // the relative information.
    // It is important to remember that we don't know from which page the user is coming from, and the URL can help us.

    // I also noticed later that this is issues 11.
  }

  clearSelection(): void {
    this.store.dispatch(TransitLinesActions.selectStop({ selectedStopId: null }))
  }

  calculateWidth(value: number, metrics: StopMetrics): number {
    const { min, max } = metrics
    const width = ((value - min) / (max - min)) * 100
    return Math.min(width, 100)
  }
}
