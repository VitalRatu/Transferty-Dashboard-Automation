import { Page} from '@playwright/test';
import { AcquirerReceiptPage } from './Receipt/AcquirerReceiptPage';
import { EMoneyReceiptPage } from './Receipt/EMoneyReceiptPage';

export class ReceiptPage 
{
    public readonly acquirerReceiptPage: AcquirerReceiptPage
    public readonly eMoneyReceiptPage: EMoneyReceiptPage


    constructor(page: Page) 
    {
        this.acquirerReceiptPage = new AcquirerReceiptPage(page)
        this.eMoneyReceiptPage = new EMoneyReceiptPage(page)
    }
}