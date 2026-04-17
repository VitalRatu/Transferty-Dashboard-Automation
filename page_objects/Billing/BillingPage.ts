import { BasePage } from '../BasePage';
import { Routes } from '../../page_data/routes'
import { Page } from 'playwright';
import { Tab } from '../related_components/Tab';
import { BalancesPage } from './BalancesPage';
import { AdjustmentsPage } from './AdjustmentsPage';
import { SettlementsPage } from './SettlementsPage';
import { FeesPage } from './FeesPage';
import { ReservePage } from './ReservePage';
import { ExchangeRatesPage } from './ExchangeRatesPage';
import { PSPPage } from './PSPPage';

/**
 * Acts as the primary orchestrator for the Billing and Financial section of the application
 * This class serves as a central hub that initializes and provides access to all sub-modules 
 * related to fund management, accounting adjustments, settlements, and provider configurations
 */
export class BillingPage 
{
    /** The primary navigation tab component used to switch between various billing sub-pages */
    public readonly tab: Tab;
    
    /** The component dedicated to monitoring and verifying project or provider balances */
    public readonly balancesPage: BalancesPage;
    
    /** The interface for creating and auditing manual balance adjustments and corrections */
    public readonly adjustmentsPage: AdjustmentsPage;
    
    /** The module for managing fund distributions and financial reconciliation cycles */
    public readonly settlementsPage: SettlementsPage;
    
    /** The management page for service charges, commissions, and fee structures */
    public readonly feesPage: FeesPage;
    
    /** The section for tracking rolling reserves and managing fund hold periods */
    public readonly reservePage: ReservePage;
    
    /** The component for monitoring real-time and historical currency exchange rates */
    public readonly exchangeRatesPage: ExchangeRatesPage;
    
    /** The provider management hub for configuring PSPs and payment intermediaries */
    public readonly pspPage: PSPPage;

    /**
     * Initializes a new instance of the BillingPage class
     * Navigates to the billing route and instantiates all specialized sub-page objects 
     * to provide a unified interface for financial automation
     * @param page - The Playwright Page instance
     */
    constructor(page: Page, tabDepth: number = 0 ) 
    {
        this.tab = new Tab(page, tabDepth);

        this.balancesPage = new BalancesPage(page, tabDepth + 1);
        this.adjustmentsPage = new AdjustmentsPage(page, tabDepth + 1);
        this.settlementsPage = new SettlementsPage(page, tabDepth + 1);
        this.feesPage = new FeesPage(page, tabDepth + 1);
        this.reservePage = new ReservePage(page, tabDepth + 1);
        this.exchangeRatesPage = new ExchangeRatesPage(page, tabDepth + 1);
        this.pspPage = new PSPPage(page, tabDepth + 1);
    }
}