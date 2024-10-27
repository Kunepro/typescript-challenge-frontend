import {
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store'
import { TransitLine } from 'src/types/line'

// Also here namespaces are generally frowned upon, NgRx offers at least for actions the createActionsGroup
// which is a valid substitute.

export const TransitLinesActions = createActionGroup({
  source: 'Transit Lines',
  events: {
    'Load Lines': emptyProps(),
    'Load Lines Success': props<{ lines: TransitLine[] }>(),
    'Load Lines Failure': props<{ error: any }>(),
    'Select Stop': props<{ selectedStopId: string }>(),
    'Toggle Line Expansion': props<{ lineId: string }>(),
  },
})
