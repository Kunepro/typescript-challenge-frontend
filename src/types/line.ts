// As we are using NgRx we want to enforce Object Immutability, so we should make the properties readonly.
export interface TransitStop {
  readonly name: string
  readonly id: string
  readonly lat: number
  readonly lng: number
  readonly prevId: string
  readonly nextId: string
  readonly peopleOn: number
  readonly peopleOff: number
  readonly reachablePopulationWalk: number
  readonly reachablePopulationBike: number
}

export interface TransitLine {
  readonly id: string
  readonly stops: TransitStop[]
  readonly isExpanded?: boolean
}

export interface StopMetrics {
  min: number;
  max: number;
  avg: number;
}

export interface TransitStopWithMetrics {
  stop: TransitStop | null;
  metrics: {
    peopleOn: StopMetrics;
    peopleOff: StopMetrics;
    reachablePopulationWalk: StopMetrics;
    reachablePopulationBike: StopMetrics;
  };
}
