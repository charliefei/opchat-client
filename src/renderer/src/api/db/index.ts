import Dexie, { Table } from 'dexie';

export class MessageDexieDb extends Dexie {
  messages!: Table<MsgType>; 

  constructor() {
    super('db_message');
    this.version(2).stores({
      messages: '++id, msg_id, msg_content, msg_receiver, msg_sender, msg_type, msg_timestamp'
    });
  }
}

export const messageDb = new MessageDexieDb();