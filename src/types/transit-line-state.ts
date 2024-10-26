import { EntityState } from '@ngrx/entity'
import { TransitLine } from './line'

export interface TransitLinesState extends EntityState<TransitLine> {
  readonly selectedStopId: string
}
