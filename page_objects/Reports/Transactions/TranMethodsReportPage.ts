import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type TranMethodsReportPageTabName = 
    | 'Project' 
    | 'Period' 
    | 'Aggregation' 
    | 'Currency' 
    | 'Provider' 
    | 'PSP' 
    | 'Intermediary' 
    | 'Internal MID' 
    | 'Aggregated MIDs' 
    | 'Tx type' 
    | 'Tx flow scheme'
    | 'Tx status'
    | 'Location method'
    | 'Redirect flow' 
    | 'Customer labels' 
    | 'Card labels'

export class TranMethodsReportPage extends BasePage
{
    public readonly filterBar: FilterBar<TranMethodsReportPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/transactions\/methods/)
        this.filterBar = new FilterBar<TranMethodsReportPageTabName>(page);
        this.table = new Table(page);
    }

    public async applyFilters()
    {
        this.filterBar.clickSecondaryButton('Apply filters');
    }

    public async exportReport()
    {
        this.filterBar.clickSecondaryButton('Export to csv');
    }
}