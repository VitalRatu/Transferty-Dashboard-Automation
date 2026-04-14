import { Page } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';

export class RecTxStatusMismatchReportPage
{
    public readonly page: Page;
    
    public readonly filterBar: FilterBar;
    
    public readonly table: Table;


    constructor(page: Page) 
    {
        this.page = page;
        this.filterBar = new FilterBar(page);
        this.table = new Table(page);
    }

    public async downloadCsvFile()
    {
        this.filterBar.clickPrimaryButton('Download .csv file');
    }

    public async createNewReport()
    {
        this.filterBar.clickSecondaryButton('Create new report');
    }
}