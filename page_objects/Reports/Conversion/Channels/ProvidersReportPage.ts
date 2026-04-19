import { Page } from '@playwright/test';
import { FilterBar } from '../../../related_components/FilterBar'; 
import { Table } from '../../../related_components/Table';
import { BasePage } from '../../../BasePage';

export type ProvidersReportPageTabName = 
    | 'Project' 
    | 'Period'
    | 'Conversion type'
    | 'Currency'
    | 'Tx type'
    | 'Tx flow scheme'
    | 'Payment method'
    | 'Tx min amount'
    | 'Tx man amount'
    | 'Provider'
    | 'Redirect flow'
    | 'Customer labels'

export class ProvidersReportPage extends BasePage
{
    public readonly filterBar: FilterBar<ProvidersReportPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/conversion\/channels\/providers/)
        this.filterBar = new FilterBar<ProvidersReportPageTabName>(page);
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