import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type FinProjectsReportPageTabName = 
    | 'Year'
    | 'Month'
    | 'Project'

export class FinProjectsReportPage extends BasePage
{
    public readonly filterBar: FilterBar<FinProjectsReportPageTabName>;
    
    public readonly table: Table;


    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/reports\/financial\/providers/)
        this.filterBar = new FilterBar<FinProjectsReportPageTabName>(page);
        this.table = new Table(page);
    }

    public async exportReport()
    {
        this.filterBar.clickSecondaryButton('Export to csv');
    }
}