import { Page } from '@playwright/test';
import { BasePage } from '../../../../BasePage';
import { FilterBar } from '../../../../related_components/FilterBar';
import { Table } from '../../../../related_components/Table';

export type AssigmentRulesListPageTabName =
{
    'Provider': string

    'Response code': 
        | '2010'
        | '2020'
        | '2022'
        | '2023'
        | '2025'
        | '2030'
        | '2035'    
        | '2040'
        | '2050'
        | '2099'

    'Labels': string
}
export class AssigmentRulesListPage extends BasePage 
{
    public readonly filter: FilterBar<AssigmentRulesListPageTabName>
    public readonly table: Table

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/settings\/assigment-rules/); 

        this.filter = new FilterBar<AssigmentRulesListPageTabName>(page)
        this.table = new Table(page)
    }

    public async addAssigmentRule(): Promise<boolean>
    {
        return await this.filter.clickPrimaryButton('Add');
    }
}