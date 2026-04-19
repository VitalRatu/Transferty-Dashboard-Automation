import { Page} from '@playwright/test';
import { FilterBar } from '../../../related_components/FilterBar'; 
import { Table } from '../../../related_components/Table';
import { BasePage } from '../../../BasePage';

export type ChangelogListPageTabName =
    | 'Period'
    | 'Actor'
    | 'Section'
    | 'Object type'
    | 'Action'

export class ChangelogListPage extends BasePage
{
    public readonly filterBar: FilterBar<ChangelogListPageTabName>;
    
    public readonly table: Table;

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/changelog/)
        this.filterBar = new FilterBar<ChangelogListPageTabName>(page);
        this.table = new Table(page);
    }
}