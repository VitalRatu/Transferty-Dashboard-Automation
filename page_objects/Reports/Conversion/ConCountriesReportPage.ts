import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type ConCountriesReportPageTabName = 
{
    'Project': string
    'Period': string
    'Conversion type': 'Number of transactions' | 'Transactions Amount'
    'Tx type': string
    'Currency': string

    'PSP': string
    'Intermediary': string
    'Internal MID': string
    'Aggregated MIDs': string

    'Payment type': 'Direct' | 'Subscriptions'
    'Payment method': string
    'Tx min amount': string
    'Tx max amount': string

    'Customer labels': string
    'Redirect flow': 'Yes' | 'No';
};

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