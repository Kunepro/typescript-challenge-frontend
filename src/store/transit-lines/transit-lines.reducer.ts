import { createEntityAdapter } from '@ngrx/entity'
import { Action, createReducer, on } from '@ngrx/store'
import { TransitLine } from 'src/types/line'
// Normally I would import these from a shared library which would have a nicer syntax
// like `import { TransitLinesState } from '@shared/types'`
import { TransitLinesState } from '../../types/transit-line-state'
import { TransitLinesActions } from './transit-lines.actions'

// While it seems intuitive to keep constants and interfaces directly related with the use,
// it becomes problematic when you try to export them with more complex project structures like for example with Nx.
// With Nx I usually have a library with all the types for that specific project to reduce the
// likelihood of circular dependencies.

export const transitLinesAdapter = createEntityAdapter<TransitLine>()

export const transitLinesInitialState: TransitLinesState = transitLinesAdapter.getInitialState({
  selectedStopId: null,
})

const reducer = createReducer(
  transitLinesInitialState,
  // In the reducer I like to hardcode the return type of the statement to make sure that I correctly return
  // a new valid reducer state, instead of leaving it to type inference.
  // SetAll might be an alternative, but that would delete custom created line if the request is updated, so it depends
  // on the use case.
  on(TransitLinesActions.loadLinesSuccess, (state, { lines }): TransitLinesState =>
    transitLinesAdapter.upsertMany(lines, state)
  ),
  on(
    TransitLinesActions.selectStop,
    (state, { selectedStopId }): TransitLinesState => ({
      ...state,
      selectedStopId,
    })
  ),
  on(TransitLinesActions.toggleLineExpansion, (state, { lineId }): TransitLinesState =>
    transitLinesAdapter.updateOne(
      {
        id: lineId,
        changes: {
          isExpanded: !state.entities[lineId]?.isExpanded,
        },
      },
      state
    )
  )
)

export function transitLinesReducer(state: TransitLinesState | undefined, action: Action): TransitLinesState {
  return reducer(state, action)
}
