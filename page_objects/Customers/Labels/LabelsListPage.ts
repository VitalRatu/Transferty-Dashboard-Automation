import { Page} from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar'; 
import { Table } from '../../related_components/Table';
import { Pagination } from '../../related_components/Pagination';
import { BasePage } from '../../BasePage';

export type LabelsListPageTabName =
    | 'Project'
    | 'Label'
    | 'Created'
    
export class LabelsListPage extends BasePage
{
    public readonly filterBar: FilterBar<LabelsListPageTabName>;
    
    public readonly table: Table;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page, /\/customers\/labels/);
        this.filterBar = new FilterBar<LabelsListPageTabName>(page);
        this.table = new Table(page);
        this.pagination = new Pagination(page);
    }

    public async addNewLabel()
    {
        await this.filterBar.clickPrimaryButton();
    }
}