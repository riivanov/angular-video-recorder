import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'MyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'video',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'size', keypath: 'size', options: { unique: false } },
        { name: 'isRecording', keypath: 'isRecording', options: { unique: false } },
        { name: 'raw', keypath: 'raw', options: { unique: false } },
      ],
    },
  ],
};
