import { Page, Locator, expect } from '@playwright/test';
import {Tab} from '../../page_objects/related_components/Tab';
import { AcquiringPage } from './Balances/AcquiringPage';   
import { DistributionPage } from './Balances/DistributionPage'; 
import { SecureDepositsPage } from './Balances/SecureDepositsPage';
import { InternalPage } from './Balances/InternalPage';
import { AggregatedPage } from './Balances/AggregatedPage';
import { CurrencyPage } from './Balances/CurrencyPage';
import { ChannelPage } from './Balances/ChannelPage';

/**
 * Acts as the central management hub for all balance-related modules in the Billing section
 * This class orchestrates navigation between specialized balance views, including merchant 
 * acquiring, fund distribution, and aggregated financial tracking
 */
export class BalancesPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The secondary navigation tab component used to switch between different balance sub-modules */
    public readonly tab: Tab;
    
    /** The module for tracking incoming payment flows and merchant acquiring balances */
    public readonly acquiringPage: AcquiringPage;
    
    /** The interface for monitoring how funds are distributed across the system */
    public readonly distributionPage: DistributionPage;
    
    /** The specialized page for managing secure deposit holdings and collateral balances */
    public readonly secureDepositsPage: SecureDepositsPage;
    
    /** The component for auditing internal system-level balances and operational accounts */
    public readonly internalPage: InternalPage;
    
    /** The view for monitoring consolidated funds across multiple merchant identifiers (MIDs) */
    public readonly aggregatedPage: AggregatedPage;
    
    /** The module providing a currency-specific breakdown of available and pending funds */
    public readonly currencyPage: CurrencyPage;
    
    /** The interface for tracking balances categorized by specific payment channels or gateways */
    public readonly channelPage: ChannelPage;

    /**
     * Initializes a new instance of the BalancesPage class
     * Sets up the tab navigation and instantiates all specialized balance sub-pages
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.tab = new Tab(page, 1);
        this.acquiringPage = new AcquiringPage(page);
        this.distributionPage = new DistributionPage(page);
        this.secureDepositsPage = new SecureDepositsPage(page);
        this.internalPage = new InternalPage(page);
        this.aggregatedPage = new AggregatedPage(page);
        this.currencyPage = new CurrencyPage(page);
        this.channelPage = new ChannelPage(page);
    }
}