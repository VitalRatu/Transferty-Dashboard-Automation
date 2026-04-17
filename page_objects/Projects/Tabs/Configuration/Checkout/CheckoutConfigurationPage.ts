import { Page } from '@playwright/test';
import { BasePage } from '../../../../BasePage';

export class CheckoutConfigurationPage extends BasePage 
{

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/checkout\/customization/); 
    }
}