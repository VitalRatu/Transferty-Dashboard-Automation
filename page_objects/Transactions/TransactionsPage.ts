import { BasePage } from '../BasePage';
import { Routes } from '../../page_data/routes';
import { Page } from '@playwright/test';
import { Tab } from '../related_components/Tab';
import { TransactionsListPage } from './TransactionsListPage';
import { ReviewPage } from './ReviewPage';
import { BlockedPage } from './BlockedPage';
import { TxAttemptsPage } from './TxAttemptsPage';
import { DisputePage } from './DisputePage';

/**
 * Acts as the main container and orchestrator for the Transactions section
 * Groups together all sub-pages and tabs related to transaction management, such as Review, Blocked, Attempts, and Disputes
 */
export class TransactionsPage extends BasePage 
{
    /** The Tab component used to navigate between different transaction categories */
    public readonly tab: Tab;
    
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

    /**
     * Initializes a new instance of the TransactionsMainPage class
     * Sets the base route to the transactions endpoint and instantiates all related sub-pages and components
     * @param page - The Playwright Page instance used for browser interactions
     */
    constructor(page: Page) 
    {
        super(page, Routes.TRANSACTIONS);
        this.tab = new Tab(page);
        
        this.transactionsListPage = new TransactionsListPage(page);
        this.reviewPage = new ReviewPage(page);
        this.blockedPage = new BlockedPage(page);
        this.txAttemptsPage = new TxAttemptsPage(page);
        this.disputePage = new DisputePage(page);
    }
}