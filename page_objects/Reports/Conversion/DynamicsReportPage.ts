import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type DynamicsReportPageTabName = 
{
    'Project': string
    'Period': string
    'Aggregation': 'Hour' | 'Day' | 'Week' | 'Month' | 'Quarter' | 'Year'
    'Currency': string

    'Provider': string
    'PSP': string
    'Intermediary': string
    'Internal MID': string
    'Aggregated MIDs': string

    'Tx type': 'payment' | 'payout' | 'refund'  
    'Tx method': string
    'Tx min amount': string
    'Tx max amount': string
    'Payment type': 'Direct' | 'Subscriptions'

    'Customer labels': string
    'Card country': string
    'Redirect flow': 'Yes' | 'No'
}
export class DynamicsReportPage extends BasePage
{
    public readonly filterBar: FilterBar<DynamicsReportPageTabName>;
    
    public readonly table: Table;


    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/conversion\/dynamics/)
        this.filterBar = new FilterBar<DynamicsReportPageTabName>(page);
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