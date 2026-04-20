import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { Table } from '../related_components/Table'; 
import { FilterBar } from '../related_components/FilterBar'; 

export type ProjectsListPageTabName = 
{
    'Project ID': string
    'Project': string
    'Website': string
    'Status': 'Active' | 'Initial' | 'Blocked'
    'Partner': string
    'Created': string
}

export class ProjectsListPage extends BasePage 
{
    public readonly table: Table;
    
    public readonly filters: FilterBar<ProjectsListPageTabName>;

    constructor(page: Page) 
    {
        super(page, /\/projects/); 

        this.table = new Table(page); 
        this.filters = new FilterBar<ProjectsListPageTabName>(page);
    }

    public async goToProject(projectName: string): Promise<void>
    {
        await this.table.clickOnColumnValue('Project', projectName)
        await this.page.waitForURL(/\/projects\/\d+\/configurations\/details/);
    }

    public async exportProjectsCsv(): Promise<void>
    {
        await this.filters.exportCsv();
    }
}