import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type FinGeneralReportPageTabName = 
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
    'Secure Deposit': string 
    
    'Tx flow scheme': 'Direct' | 'Subscriptions' 
    'Redirect flow': 'Yes' | 'No' 
    'Customer labels': string 
    'Card labels': string
}
export class FinGeneralReportPage extends BasePage
{
    public readonly filterBar: FilterBar<FinGeneralReportPageTabName>;
    
    public readonly table: Table;


    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/financial\/general/)
        this.filterBar = new FilterBar<FinGeneralReportPageTabName>(page);
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