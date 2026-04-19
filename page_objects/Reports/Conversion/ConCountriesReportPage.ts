import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type ConCountriesReportPageTabName = 
    | 'Project' 
    | 'Period'
    | 'Conversion type'
    | 'Tx type'
    | 'Currency'
    | 'PSP'
    | 'Intermediary'
    | 'Internal MID'
    | 'Aggregated MIDs'
    | 'Payment type'
    | 'Payment method'
    | 'Tx min amount'
    | 'Tx max amount'
    | 'Customer labels'
    | 'Redirect flow'

export class ConCountriesReportPage extends BasePage
{
    public readonly filterBar: FilterBar<ConCountriesReportPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/conversion\/countries/)
        this.filterBar = new FilterBar<ConCountriesReportPageTabName>(page);
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