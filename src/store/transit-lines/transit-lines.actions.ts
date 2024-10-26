import { createActionGroup, props } from '@ngrx/store'
import { TransitLine } from 'src/types/line'

// Also here namespaces are generally frowned upon, NgRx offers at least for actions the createActionsGroup
// which is a valid substitute.

export const TransitLinesActions = createActionGroup({
  source: 'Transit Lines',
  events: {
    'Add Line': props<{ line: TransitLine }>(),
    'Select Stop': props<{ selectedStopId: string }>(),
    'Toggle Line Expansion': props<{ lineId: string }>(),
  },
})
