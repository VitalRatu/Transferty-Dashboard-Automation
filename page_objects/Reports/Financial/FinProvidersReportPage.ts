import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type FinProvidersReportPageTabName = 
    | 'Project' 
    | 'Period' 
    | 'Aggregation' 
    | 'Currency' 
    | 'Provider' 
    | 'PSP' 
    | 'Intermediary' 
    | 'Internal MID' 
    | 'Tx type' 
    | 'Currency'
    | 'Redirect flow' 
    | 'Customer labels' 
    | 'Card labels'
    | 'Tx method'

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