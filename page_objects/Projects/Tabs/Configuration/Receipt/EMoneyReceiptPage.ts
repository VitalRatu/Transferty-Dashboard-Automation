import { Page } from '@playwright/test';
import { BasePage } from '../../../../BasePage';

export class EMoneyReceiptPage extends BasePage 
{

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/receipt\/emoney/); 
    }
}