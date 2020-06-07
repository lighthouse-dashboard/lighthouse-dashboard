declare namespace System {
    export interface Info {
        worker_last_run?: Date;
    }
}

declare namespace SystemAPI {
    export interface Info {
        worker_last_run?: Date;
        db: {
            collections: number;
            dataSize: string;
        }
    }
}
