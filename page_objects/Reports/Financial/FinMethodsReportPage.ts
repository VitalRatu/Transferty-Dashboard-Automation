import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type FinMethodsReportPageTabName = 
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
    
    'Tx type': string 
    'Location method': 'Customer IP' | 'Card Country'
    'Tx flow scheme': 'Direct' | 'Subscriptions' 
    'Redirect flow': 'Yes' | 'No' 
    'Customer labels': string 
    'Card labels': string
}

export class FinMethodsReportPage extends BasePage
{
    public readonly filterBar: FilterBar<FinMethodsReportPageTabName>;
    
    public readonly table: Table;


    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/financial\/methods/)
        this.filterBar = new FilterBar<FinMethodsReportPageTabName>(page);
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