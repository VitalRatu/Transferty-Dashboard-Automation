import { BasePage } from '../../BasePage';
import { Page } from '@playwright/test';
import { Table } from '../../related_components/Table'; 
import { FilterBar } from '../../related_components/FilterBar'; 
import { Routes } from '../../../page_data/routes';
import { Pagination } from '../../related_components/Pagination';


export class LimitsListPage extends BasePage 
{
    public readonly table: Table;
    
    public readonly filter: FilterBar;

    public readonly pagination: Pagination;

    constructor(page: Page) 
    {
        super(page); 

        this.table = new Table(page); 

        this.filter = new FilterBar(page);

        this.pagination = new Pagination(page);
    }
}