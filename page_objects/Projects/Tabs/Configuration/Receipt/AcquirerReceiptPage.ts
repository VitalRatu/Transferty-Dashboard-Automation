import { Page } from '@playwright/test';
import { BasePage } from '../../../../BasePage';

export class AcquirerReceiptPage extends BasePage 
{

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/receipt\/acquirer/); 
    }
}