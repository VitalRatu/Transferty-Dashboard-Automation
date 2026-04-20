import { BasePage } from '../../BasePage';
import { Page } from '@playwright/test';
import { Table } from '../../related_components/Table'; 
import { FilterBar } from '../../related_components/FilterBar'; 
import { Pagination } from '../../related_components/Pagination';

export type AuditTrailListPageTabName =
{
    'Project': string
    'Actor': string 
    'IP': string 
    'Event': string
    'Timestamp': string  
}
export class AuditTrailListPage extends BasePage 
{
    public readonly table: Table;
    
    public readonly filter: FilterBar<AuditTrailListPageTabName>;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page, /\/monitoring\/audit-trail/); 

        this.table = new Table(page); 
        this.filter = new FilterBar<AuditTrailListPageTabName>(page);
        this.pagination = new Pagination(page);
    }
}