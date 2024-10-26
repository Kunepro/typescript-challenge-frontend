import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { GeoJSONSource, Map } from 'maplibre-gl'
import { MARKER_PAINT } from 'src/constants/marker-paint'
import { u9 } from 'src/constants/u9'
import { environment } from 'src/environments/environment'
import { TransitLinesActions } from 'src/store/transit-lines/transit-lines.actions'
import * as fromTransitLines from '../store/transit-lines/transit-lines.selectors'
import { RootState } from '../types/root-state'

const STOPS_SOURCE_ID = 'stops-source'
const STOPS_LAYER_ID = 'stops-layer'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  @ViewChild('map', { static: true }) private mapRef: ElementRef<HTMLElement>

  private map: Map

  constructor(private store: Store<RootState>) {
    // Issue https://github.com/targomo/typescript-challenge-frontend/issues/3
  }

  ngOnInit(): void {
    this.store.dispatch(TransitLinesActions.addLine({ line: u9 }))
    this.initMap()
  }

  private initMap(): void {
    this.map = new Map({
      center: {
        lat: 52.52,
        lng: 13.4,
      },
      zoom: 10,
      container: this.mapRef.nativeElement,
      style: `https://api.maptiler.com/maps/dataviz-light/style.json?key=${environment.maptilerApiKey}`,
    })

    this.map.once('load', () => {
      this.setupStopsLayer()
    })
  }

  private setupStopsLayer(): void {
    const stopsSource$ = this.store.pipe(select(fromTransitLines.selectStopsPointGeoJson))

    stopsSource$.subscribe((source) => {
      const existingSource = this.map.getSource(STOPS_SOURCE_ID) as GeoJSONSource

      if (existingSource) {
        existingSource.setData(source.data)
      } else {
        this.map.addSource(STOPS_SOURCE_ID, source)
      }
    })

    this.map.addLayer({
      type: 'circle',
      source: STOPS_SOURCE_ID,
      id: STOPS_LAYER_ID,
      paint: MARKER_PAINT,
    })

    // The following issues are likely to be implemented here
    // https://github.com/targomo/typescript-challenge-frontend/issues/2
    // https://github.com/targomo/typescript-challenge-frontend/issues/2
    // https://github.com/targomo/typescript-challenge-frontend/issues/6
    // https://github.com/targomo/typescript-challenge-frontend/issues/8
  }
}
