import { BasePage } from '../../BasePage';
import { Page } from '@playwright/test';
import { Table } from '../../related_components/Table'; 
import { FilterBar } from '../../related_components/FilterBar'; 
import { Pagination } from '../../related_components/Pagination';

export type LimitsListPageTabName =
{
    'Project': string
    'Period': string 
    'Provider': string
    'PSP': string
    'Internal MID': string
    'Currency': string
}
export class LimitsListPage extends BasePage 
{
    public readonly table: Table;
    
    public readonly filter: FilterBar<LimitsListPageTabName>;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page, /\/monitoring\/limits/); 

        this.table = new Table(page); 

        this.filter = new FilterBar<LimitsListPageTabName>(page);

        this.pagination = new Pagination(page);
    }
}