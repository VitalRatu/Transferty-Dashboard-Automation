import { Page } from 'playwright';
import { FilterBar } from '../related_components/FilterBar'; 
import { Table } from '../related_components/Table';
import { BasePage } from '../BasePage';

export type MarginReportPageTabName =
    | 'Period' 
    | 'Aggregation'
    | 'Currency'
    | 'Project'

export class MarginReportPage extends BasePage
{
    public readonly filterBar: FilterBar<MarginReportPageTabName>;

    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/margin/)

        this.filterBar = new FilterBar<MarginReportPageTabName>(page);
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