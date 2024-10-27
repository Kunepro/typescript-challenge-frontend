import { createFeatureSelector, createSelector } from '@ngrx/store'
import { GeoJSONSourceSpecification } from 'maplibre-gl'
import { AppParam } from '../../types/app-param'
import { StopMetrics, TransitStopWithMetrics } from '../../types/line'
import { StoreFeature } from '../../types/store-feature'
import { TransitLinesState } from '../../types/transit-line-state'
import { selectQueryParams } from '../router/router-selectors'
import { transitLinesAdapter } from './transit-lines.reducer'

// Note: Avoid using `namespace` for grouping exports.
// Instead of `namespace`, export each item individually and group them with `import * as` syntax when needed.
// This keeps code compatible with tree-shaking and aligns with JavaScript standards.
// If it annoys you to have to manually type the import because the IDE doesn't automatise it, the alternative is to
// to prefix the selectors, like for example `selectFromTransitLinesSelectedStopId` "FromTransitLine" contextualises the
// selector.

export const selectTransitLinesState = createFeatureSelector<TransitLinesState>(StoreFeature.TransitLines)

export const { selectAll } = transitLinesAdapter.getSelectors(selectTransitLinesState)

export const selectAllStops = createSelector(selectAll, (lines) => lines.map((line) => line.stops).flat())

export const selectSelectedStopWithMetrics = createSelector(
  selectQueryParams,
  selectAllStops,
  (appQueryParams, stops): TransitStopWithMetrics => {
    const selectedStopId = appQueryParams[AppParam.StopId]
    const selectedStop = stops.find((stop) => stop.id === selectedStopId) || null

    if (!selectedStop) {
      return {
        stop: null,
        metrics: null,
      }
    }

    // Get all stops in the selected stop's line
    const lineStops = stops.filter((stop) => stop.id !== selectedStopId)

    // Calculate metrics
    const peopleOnMetrics = calculateMetrics(lineStops.map((stop) => stop.peopleOn))
    const peopleOffMetrics = calculateMetrics(lineStops.map((stop) => stop.peopleOff))
    const walkMetrics = calculateMetrics(lineStops.map((stop) => stop.reachablePopulationWalk))
    const bikeMetrics = calculateMetrics(lineStops.map((stop) => stop.reachablePopulationBike))

    return {
      stop: selectedStop,
      metrics: {
        peopleOn: peopleOnMetrics,
        peopleOff: peopleOffMetrics,
        reachablePopulationWalk: walkMetrics,
        reachablePopulationBike: bikeMetrics,
      },
    }
  }
)

/**
 * Mapbox source for the locations
 */
export const selectStopsPointGeoJson = createSelector(
  selectAllStops,
  (stops) =>
    ({
      type: 'geojson',
      promoteId: '_id',
      data: {
        type: 'FeatureCollection',
        features: stops.map((stop) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [stop.lng, stop.lat],
          },
          properties: {
            peopleOn: stop.peopleOn,
            peopleOff: stop.peopleOff,
            reachablePopulationBike: stop.reachablePopulationBike,
            reachablePopulationWalk: stop.reachablePopulationWalk,
            _id: stop.id,
          },
        })),
      },
    }) as GeoJSONSourceSpecification
)

// Issue https://github.com/targomo/typescript-challenge-frontend/issues/1
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const selectStopsLinesGeoJson = createSelector(selectAll, (lines) => {
  return null
})

const calculateMetrics = (values: number[]): StopMetrics => {
  const sum = values.reduce((acc, value) => acc + value, 0)
  const avg = sum / values.length
  const min = Math.min(...values)
  const max = Math.min(Math.max(...values), avg * 1.5);
  return {
    min,
    max,
    avg,
  }
}
