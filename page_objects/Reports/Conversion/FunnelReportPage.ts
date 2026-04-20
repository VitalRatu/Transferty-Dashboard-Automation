import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type FunnelReportPageTabName = {
    'Project': string
    'Period': string

    'Aggregation': 'Hour' | 'Day' | 'Week' | 'Month' | 'Quarter' | 'Year'
    'Source': 'Checkout' | 'Embedded' | 'H2H'
    'Device': 'Mobile' | 'Desktop'
    
    'Redirect flow': 'Yes' | 'No';
    'Customer labels': string
}
export class FunnelReportPage extends BasePage
{
    public readonly filterBar: FilterBar<FunnelReportPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/conversion\/funnel/)
        this.filterBar = new FilterBar<FunnelReportPageTabName>(page);
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