import { faker } from '@faker-js/faker'
import { TransitStop, TransitStopWithMetrics } from 'src/types/line'

export function mockTransitStop(seed: Partial<TransitStop> = {}): TransitStop {
  return {
    name: faker.word.noun(),
    id: faker.string.uuid(),
    lat: +faker.location.latitude(),
    lng: +faker.location.longitude(),
    prevId: faker.string.uuid(),
    nextId: faker.string.uuid(),
    peopleOn: faker.number.int(),
    peopleOff: faker.number.int(),
    reachablePopulationWalk: faker.number.int(),
    reachablePopulationBike: faker.number.int(),
    ...seed,
  }
}

export function mockTransitStopWithMetrics(seed: Partial<TransitStop> = {}): TransitStopWithMetrics {
  return {
    metrics: {
      peopleOn: {
        min: faker.number.int(),
        max: faker.number.int(),
        avg: faker.number.int(),
      },
      peopleOff: {
        min: faker.number.int(),
        max: faker.number.int(),
        avg: faker.number.int(),
      },
      reachablePopulationWalk: {
        min: faker.number.int(),
        max: faker.number.int(),
        avg: faker.number.int(),
      },
      reachablePopulationBike: {
        min: faker.number.int(),
        max: faker.number.int(),
        avg: faker.number.int(),
      },
    },
    stop: {
      name: faker.word.noun(),
      id: faker.string.uuid(),
      lat: +faker.location.latitude(),
      lng: +faker.location.longitude(),
      prevId: faker.string.uuid(),
      nextId: faker.string.uuid(),
      peopleOn: faker.number.int(),
      peopleOff: faker.number.int(),
      reachablePopulationWalk: faker.number.int(),
      reachablePopulationBike: faker.number.int(),
      ...seed,
    },
  }
}
