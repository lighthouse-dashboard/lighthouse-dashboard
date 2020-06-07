declare namespace System {
    export interface Info {
        worker_last_run?: Date;
        worker_is_running?: Date;
    }
}

declare namespace SystemAPI {
    export interface Info {
        worker_last_run?: Date;
        worker_is_running?: Date;
        db: {
            collections: number;
            dataSize: string;
        }
    }
}
