import { Page } from 'playwright';
import { Tab } from '../related_components/Tab';
import { RecTransactionReportPage } from './Reconciliation/RecTransactionReportPage';
import { RecTxAttemptsReportPage } from './Reconciliation/RecTxAttemptsReportPage';
import { RecTxStatusMismatchReportPage } from './Reconciliation/RecTxStatusMismatchReportPage';

export class ReconciliationReportPage
{
    public readonly page: Page;

    public readonly tab: Tab;

    public readonly recTransactionReportPage: RecTransactionReportPage;
    public readonly recTxAttemptsReportPage: RecTxAttemptsReportPage
    public readonly recTxStatusMismatchReportPage: RecTxStatusMismatchReportPage;
    
    constructor(page: Page) 
    {
        this.page = page;
    
        this.tab = new Tab(page, 1);

        this.recTransactionReportPage = new RecTransactionReportPage(page);
        this.recTxAttemptsReportPage = new RecTxAttemptsReportPage(page);
        this.recTxStatusMismatchReportPage = new RecTxStatusMismatchReportPage(page);
    }
}