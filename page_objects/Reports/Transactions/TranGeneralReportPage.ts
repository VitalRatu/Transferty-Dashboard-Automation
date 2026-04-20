import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type TranGeneralReportPageTabName = 
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
    'Tx flow scheme': 'Direct' | 'Subscriptions' 
    'Tx method': string
    'Data type': 'Tx number' | 'Tx amount'
    'Redirect flow': 'Yes' | 'No' 
    'Customer labels': string
    'Card labels': string
};

export class TranGeneralReportPage extends BasePage
{
    public readonly filterBar: FilterBar<TranGeneralReportPageTabName>;
    
    public readonly table: Table;


    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/transactions\/general/)
        this.filterBar = new FilterBar<TranGeneralReportPageTabName>(page);
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