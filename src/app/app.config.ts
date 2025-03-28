import { ApplicationConfig, importProvidersFrom, inject, Injectable, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { STORAGE_ENGINE, StorageEngine, withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { routes } from './app.routes';
import { provideIndexedDb, DBConfig, NgxIndexedDBService } from 'ngx-indexed-db';
import { firstValueFrom } from 'rxjs';
import { NgxsStoreModule } from '../../store/store.module';


const dbConfig: DBConfig  = {
  name: 'Videos',
  version: 1,
  objectStoresMeta: [{
    store: 'people',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } }
    ]
  }]
};

@Injectable()
export class MyStorageEngine implements StorageEngine {
  #dbService = inject(NgxIndexedDBService);
  #storeName = dbConfig.objectStoresMeta[0].store;

  async getItem(key: string) {
    // Your logic here
    return firstValueFrom(this.#dbService.getByKey(this.#storeName, key));
  }

  async setItem(key: string, value: any) {
    // Your logic here
    this.#dbService.update(this.#storeName + key, value);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(
      [],
      withNgxsStoragePlugin({
        keys: '*',
      })
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: STORAGE_ENGINE,
      useClass: MyStorageEngine
    },
    provideIndexedDb(dbConfig),
    importProvidersFrom(NgxsStoreModule)
  ],
};
