import { BasePage } from '../../BasePage';
import { Page } from '@playwright/test';
import { Table } from '../../related_components/Table'; 
import { FilterBar } from '../../related_components/FilterBar'; 
import { Pagination } from '../../related_components/Pagination';

export type TriggeredRulesListPageTabName =
{
    'ID': string 
    'Project': string 
    'Rule': string 
    'Timestamp': string
}
export class TriggeredRulesListPage extends BasePage 
{
    public readonly table: Table;
    
    public readonly filter: FilterBar<TriggeredRulesListPageTabName>;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page, /\/monitoring\/triggered-rules/); 

        this.table = new Table(page); 

        this.filter = new FilterBar<TriggeredRulesListPageTabName>(page);

        this.pagination = new Pagination(page);
    }
}