import { Page } from 'playwright';
import { Tab } from '../related_components/Tab';
import { BalancesPage } from './BalancesPage';
import { AdjustmentsPage } from './AdjustmentsPage';
import { SettlementsPage } from './SettlementsPage';
import { FeesPage } from './FeesPage';
import { ReservePage } from './ReservePage';
import { ExchangeRatesPage } from './ExchangeRatesPage';
import { PSPPage } from './PSPPage';
import { Orchestrator } from '../Orchestrator';

export type BillingTabName = 
    | 'Balances' 
    | 'Adjustments' 
    | 'Settlements' 
    | 'Fees' 
    | 'Reserve' 
    | 'Base exchange rates' 
    | 'PSP' 

export class BillingPage extends Orchestrator<BillingTabName>
{
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
        super(page, tabDepth);

        this.balancesPage = new BalancesPage(page, tabDepth + 1);
        this.adjustmentsPage = new AdjustmentsPage(page, tabDepth + 1);
        this.settlementsPage = new SettlementsPage(page, tabDepth + 1);
        this.feesPage = new FeesPage(page, tabDepth + 1);
        this.reservePage = new ReservePage(page, tabDepth + 1);
        this.exchangeRatesPage = new ExchangeRatesPage(page, tabDepth + 1);
        this.pspPage = new PSPPage(page, tabDepth + 1);
    }
}