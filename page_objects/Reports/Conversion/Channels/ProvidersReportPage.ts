import { Page } from '@playwright/test';
import { FilterBar } from '../../../related_components/FilterBar'; 
import { Table } from '../../../related_components/Table';
import { BasePage } from '../../../BasePage';

export type ProvidersReportPageTabName = 
{
    'Project': string
    'Period': string
    'Conversion type': 'Number of transactions' | 'Transactions Amount'
    'Currency': string
    
    'Tx type': 'payment' | 'payout'
    'Tx flow scheme': 'Direct' | 'Subscriptions';
    'Payment method': string
    'Tx min amount': string
    'Tx max amount': string 
    
    'Provider': string;
    'Redirect flow': 'Yes' | 'No';
    'Customer labels': string
}
export class ProvidersReportPage extends BasePage
{
    public readonly filterBar: FilterBar<ProvidersReportPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/conversion\/channels\/providers/)
        this.filterBar = new FilterBar<ProvidersReportPageTabName>(page);
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