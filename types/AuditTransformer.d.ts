import { Report } from './Report';

export interface AuditTransformer<T> {
    (audit: T): Report;
}
