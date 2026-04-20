import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type TranDistributionReportPageTabName = 
{
    'Project': string
    'Period': string
    'Aggregation': 'Hour' | 'Day' | 'Week' | 'Month' | 'Quarter' | 'Year'
    'Data type': 'Amount' | 'Quantity'
    'Currency': string

    'Provider': string
    'PSP': string
    'Intermediary': string
    'Internal MID': string
    'Aggregated MIDs': string

    'Amount from': string
    'Amount to': string
    'Range group': 
        | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' 
        | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20';

    'Tx type': 'payment' | 'payout' | 'refund'
    'Tx flow scheme': 'Direct' | 'Subscriptions'
    'Redirect flow': 'Yes' | 'No'
    'Customer labels': string
    'Card labels': string
}

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