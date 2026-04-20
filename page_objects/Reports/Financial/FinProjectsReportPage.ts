import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type FinProjectsReportPageTabName = 
{
    'Year': string
    'Month': '01 - January' | '02 - February' | '03 - March' | '04 - April' | '05 - May' | '06 - June' | '07 - July' | '08 - August' | '09 - September' | '10 - October' | '11 - November' | '12 - December'
    'Project': string
}

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