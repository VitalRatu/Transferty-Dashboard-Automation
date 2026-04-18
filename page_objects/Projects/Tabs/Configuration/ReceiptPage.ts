import { Page} from '@playwright/test';
import { AcquirerReceiptPage } from './Receipt/AcquirerReceiptPage';
import { EMoneyReceiptPage } from './Receipt/EMoneyReceiptPage';
import { Orchestrator } from '../../../Orchestrator';

export type ReceiptTabName = 
    | 'Acquirer receipt' 
    | 'E-money receipt' 

export class ReceiptPage extends Orchestrator<ReceiptTabName>
{
    public readonly acquirerReceiptPage: AcquirerReceiptPage
    public readonly eMoneyReceiptPage: EMoneyReceiptPage


    constructor(page: Page, tabDepth = 0) 
    {   
        super(page, tabDepth)
        this.acquirerReceiptPage = new AcquirerReceiptPage(page)
        this.eMoneyReceiptPage = new EMoneyReceiptPage(page)
    }
}