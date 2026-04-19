import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type TranDistributionReportPageTabName = 
    | 'Project' 
    | 'Period' 
    | 'Aggregation' 
    | 'Data type'
    | 'Currency' 
    | 'Provider' 
    | 'PSP' 
    | 'Intermediary' 
    | 'Internal MID' 
    | 'Aggregated MIDs' 
    | 'Amount from'
    | 'Amount to'
    | 'Range group'
    | 'Tx type' 
    | 'Tx flow scheme'
    | 'Redirect flow' 
    | 'Customer labels' 
    | 'Card labels'

export class TranDistributionReportPage extends BasePage
{
    public readonly filterBar: FilterBar<TranDistributionReportPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/transactions\/distribution/)
        this.filterBar = new FilterBar<TranDistributionReportPageTabName>(page);
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