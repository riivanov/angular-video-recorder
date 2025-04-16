import { Injectable } from '@angular/core';
import { StorageEngine } from '@ngxs/storage-plugin';
import { get, set } from 'idb-keyval';

@Injectable({ providedIn: 'root' })
export class MyStorageEngine implements StorageEngine {
  async getItem(key: string) {
    console.log('getItem', key);
    const tmp = await get(key);
    if (!tmp) return
    return JSON.parse(tmp);
  }

  async setItem(key: string, value: any) {
    if (value === `{"__zone_symbol__state":true}`){
      return;
    }
    // console.log('setItem', key, value);
    await set(key, value);
  }
}
