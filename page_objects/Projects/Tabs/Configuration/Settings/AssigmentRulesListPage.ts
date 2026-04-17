import { Page } from '@playwright/test';
import { BasePage } from '../../../../BasePage';
import { FilterBar } from '../../../../related_components/FilterBar';
import { Table } from '../../../../related_components/Table';

export class AssigmentRulesListPage extends BasePage 
{
    public readonly filter: FilterBar
    public readonly table: Table

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/settings\/assigment-rules/); 

        this.filter = new FilterBar(page)
        this.table = new Table(page)
    }
}