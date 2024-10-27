import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import * as fromTransitLines from 'src/store/transit-lines/transit-lines.selectors'
import { RootState } from '../types/root-state'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent
  let mockStore: MockStore<any>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideMockStore()],
    }).compileComponents()

    mockStore = TestBed.inject(Store) as MockStore<RootState>
    mockStore.overrideSelector(fromTransitLines.selectStopsPointGeoJson, null)

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  test('should create the app', () => {
    expect(component).toBeTruthy()
  })

  // No longer calls add line, so test removed

  test('should have a map', () => {
    expect(component['map']).toBeTruthy()
  })
})
