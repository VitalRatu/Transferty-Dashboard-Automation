import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type FinProvidersReportPageTabName = 
{
    'Period': string 
    'Project name': string 

    'Provider': string
    'PSP': string  
    'Intermediary': string  
    'Internal MID': string  
    
    'Tx type': 'payment' | 'payout' | 'refund'   
    'Currency': string 
    'Redirect flow': 'Yes' | 'No'  
    'Customer labels': string  
    'Card labels': string 
    'Tx method': string 
}
export class FinProvidersReportPage extends BasePage
{
    public readonly filterBar: FilterBar<FinProvidersReportPageTabName>;
    
    public readonly table: Table;


    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/financial\/providers/)
        this.filterBar = new FilterBar<FinProvidersReportPageTabName>(page);
        this.table = new Table(page);
    }

    public async exportReport()
    {
        this.filterBar.clickSecondaryButton('Export to csv');
    }
}