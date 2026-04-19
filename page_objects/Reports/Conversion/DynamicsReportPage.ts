import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type DynamicsReportPageTabName = 
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
    | 'Tx method'
    | 'Tx min amount'
    | 'Tx max amount'
    | 'Payment type'
    | 'Customer labels'
    | 'Card country'
    | 'Redirect flow'

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