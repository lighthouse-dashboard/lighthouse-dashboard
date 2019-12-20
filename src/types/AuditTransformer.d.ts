import { Report } from './report';

export interface AuditTransformer<T> {
    (audit: T): Report;
}
