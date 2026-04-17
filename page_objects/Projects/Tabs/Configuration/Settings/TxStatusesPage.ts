import { Page } from '@playwright/test';
import { BasePage } from '../../../../BasePage';

export class TxStatusesPage extends BasePage 
{
    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/settings\/tx-status/); 
    }
}