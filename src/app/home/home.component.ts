import { ChangeDetectionStrategy, Component, Signal } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { TransitLinesActions } from 'src/store/transit-lines/transit-lines.actions'
import * as fromTransitLines from 'src/store/transit-lines/transit-lines.selectors'
import { TransitLine } from 'src/types/line'
import { RootState } from '../../types/root-state'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon, RouterLink],
})
export class HomeComponent {
  readonly lines: Signal<TransitLine[]>

  constructor(private store: Store<RootState>) {
    this.lines = this.store.selectSignal(fromTransitLines.selectAll)
  }

  toggleLineExpansion(lineId: string): void {
    this.store.dispatch(TransitLinesActions.toggleLineExpansion({ lineId }))
  }

  selectStop(selectedStopId: string): void {
    this.store.dispatch(TransitLinesActions.selectStop({ selectedStopId }))
  }
}
