import { VideosState } from './../store/video/videos.state';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { STORAGE_ENGINE, withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { NgxsStoreModule } from '../store/store.module';
import { routes } from './app.routes';
import { MyStorageEngine } from './storage-engine';
import { VideoState } from '../store/video/video.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(
      [],
      withNgxsStoragePlugin({
        keys: [VideosState, VideoState],
        async deserialize(obj) {
          const unwrapped = await obj;
          if (!unwrapped) return
          console.log("deserializing", unwrapped)
          return JSON.parse(unwrapped)
        },
      })
    ),
    {
      provide: STORAGE_ENGINE,
      useClass: MyStorageEngine
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(NgxsStoreModule),
  ],
};
