import { Page } from '@playwright/test';
import { BasePage } from '../../../../BasePage';

export class FallbackDomainListPage extends BasePage 
{
    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/settings\/fallback-domains/); 
    }
}