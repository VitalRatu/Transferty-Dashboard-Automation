import { Page } from 'playwright';
import { Tab } from '../related_components/Tab';
import { RecTransactionReportPage } from './Reconciliation/RecTransactionReportPage';
import { RecTxAttemptsReportPage } from './Reconciliation/RecTxAttemptsReportPage';
import { RecTxStatusMismatchReportPage } from './Reconciliation/RecTxStatusMismatchReportPage';
import { Orchestrator } from '../Orchestrator';

export type ReconciliationReportTabName = 
    | 'Transactions' 
    | 'Tx attempts' 
    | 'Tx status mismatch' 

export class ReconciliationReportPage extends Orchestrator<ReconciliationReportTabName>
{
    public readonly recTransactionReportPage: RecTransactionReportPage;
    public readonly recTxAttemptsReportPage: RecTxAttemptsReportPage
    public readonly recTxStatusMismatchReportPage: RecTxStatusMismatchReportPage;
    
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth)
        this.recTransactionReportPage = new RecTransactionReportPage(page);
        this.recTxAttemptsReportPage = new RecTxAttemptsReportPage(page);
        this.recTxStatusMismatchReportPage = new RecTxStatusMismatchReportPage(page);
    }
}