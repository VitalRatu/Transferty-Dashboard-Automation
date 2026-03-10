import { Page, Locator, expect } from '@playwright/test';
import {Tab} from '../../../page_objects/related_components/Tab';
import { MerchantPage } from '.././Wallets/Merchant/MerchantPage';
import { CustomerPage } from '.././Wallets/Customer/CustomerPage';
import { OperationalPage } from '.././Wallets/Operational/OperationalPage';

/**
 * Represents the Wallets management hub within the E-money section
 * This class orchestrates navigation and access to different wallet categories, including 
 * Operational, Merchant, and Customer wallets, utilizing a secondary tab system
 */
export class WalletsPage 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** The secondary Tab component (index 1) used to switch between different wallet types */
    public readonly tab: Tab;
    
    /** The page instance dedicated to managing internal operational wallets used for system fees and balances */
    public readonly operationalPage: OperationalPage;
    
    /** The page instance dedicated to managing merchant-specific wallets and their transaction histories */
    public readonly merchantPage: MerchantPage
    
    /** The page instance dedicated to managing individual customer wallets and balances */
    public readonly customerPage: CustomerPage;

    /**
     * Initializes a new instance of the WalletsPage class
     * Sets up the secondary tab navigation and instantiates all specialized wallet category pages
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.tab = new Tab(page, 1);
        this.operationalPage = new OperationalPage(page);
        this.merchantPage = new MerchantPage(page);
        this.customerPage = new CustomerPage(page);

    }
}