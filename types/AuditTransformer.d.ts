import { Report } from '../src/api/reports/types/Report';

export interface AuditTransformer<T> {
    (audit: T): Report;
}
