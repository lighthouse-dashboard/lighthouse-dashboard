import { Db, MongoClient } from 'mongodb';

export interface MongodbDecoration {
    db: Db;
    client: MongoClient
}
