import { Page } from '@playwright/test';
import { TransactionsListPage } from './TransactionsPages/TransactionsListPage';
import { ReviewPage } from './TransactionsPages/ReviewPage';
import { BlockedPage } from './TransactionsPages/BlockedPage';
import { TxAttemptsPage } from './TransactionsPages/TxAttemptsPage';
import { DisputePage } from './TransactionsPages/DisputePage'
import { Orchestrator } from '../Orchestrator';

export type TransactionsTabName = 
    | 'Transactions' 
    | 'Review' 
    | 'Blocked'
    | 'Tx attempts'
    | 'Disputes'

export class TransactionsPage extends Orchestrator<TransactionsTabName>
{
    /** The default Transactions page instance for viewing and managing standard transactions */
    public readonly transactionsListPage: TransactionsListPage;
    
    /** The Review page instance for handling transactions that require manual review */
    public readonly reviewPage: ReviewPage;
    
    /** The Blocked page instance for managing blocked transactions */
    public readonly blockedPage: BlockedPage;
    
    /** The TxAttempts page instance for viewing transaction attempt logs */
    public readonly txAttemptsPage: TxAttemptsPage;
    
    /** The Dispute page instance for managing transaction disputes and chargebacks */
    public readonly disputePage: DisputePage;

    constructor(page: Page, tabDepth = 0) 
    {
        super(page, tabDepth);
        
        this.transactionsListPage = new TransactionsListPage(page);
        this.reviewPage = new ReviewPage(page);
        this.blockedPage = new BlockedPage(page);
        this.txAttemptsPage = new TxAttemptsPage(page);
        this.disputePage = new DisputePage(page);
    }
}