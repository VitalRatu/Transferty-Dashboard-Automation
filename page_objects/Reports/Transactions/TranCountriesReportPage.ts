import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type TranCountriesReportPageTabName = 
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
    | 'Tx status'
    | 'Location method'
    | 'Redirect flow' 
    | 'Customer labels' 
    | 'Card labels'
    | 'Tx method'

export class TranCountriesReportPage extends BasePage
{ 
    public readonly filterBar: FilterBar<TranCountriesReportPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/transactions\/countries/)
        this.filterBar = new FilterBar<TranCountriesReportPageTabName>(page);
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