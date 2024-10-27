import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { of } from 'rxjs'
import { mockTransitStopWithMetrics } from 'src/__mocks__/line.mock'
import * as fromTransitLines from 'src/store/transit-lines/transit-lines.selectors'
import { RootState } from '../../types/root-state'
import { DetailComponent } from './detail.component'

describe('DetailComponent', () => {
  let component: DetailComponent
  let fixture: ComponentFixture<DetailComponent>
  let mockStore: MockStore<any>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { stopId: 'someStopId' } },
            params: of({ stopId: 'someStopId' }),
          },
        },
      ],
    }).compileComponents()

    mockStore = TestBed.inject(Store) as MockStore<RootState>
    mockStore.overrideSelector(fromTransitLines.selectSelectedStopWithMetrics, mockTransitStopWithMetrics())
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  test('should create', () => {
    expect(component).toBeTruthy()
  })
})
