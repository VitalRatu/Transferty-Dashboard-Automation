import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type FinCountriesReportPageTabName = 
    | 'Project' 
    | 'Period' 
    | 'Aggregation' 
    | 'Currency' 
    | 'Provider' 
    | 'PSP' 
    | 'Intermediary' 
    | 'Internal MID' 
    | 'Aggregated MIDs' 
    | 'Tx type' 
    | 'Tx flow scheme'
    | 'Location method'
    | 'Redirect flow' 
    | 'Customer labels' 
    | 'Card labels'
    | 'Tx method'

export class FinCountriesReportPage extends BasePage
{
    public readonly filterBar: FilterBar<FinCountriesReportPageTabName>;
    
    public readonly table: Table;


    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/financial\/countries/)
        this.filterBar = new FilterBar<FinCountriesReportPageTabName>(page);
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