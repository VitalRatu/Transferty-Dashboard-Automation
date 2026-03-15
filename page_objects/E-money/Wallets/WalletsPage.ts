import { Page, Locator, expect } from '@playwright/test';
import {Tab} from '../../../page_objects/related_components/Tab';
import { MerchantWalletsListPage } from '.././Wallets/Merchant/MerchantWalletsListPage';
import { CustomerWalletsListPage } from '.././Wallets/Customer/CustomerWalletsListPage';
import { OperationalWalletsListPage } from '.././Wallets/Operational/OperationalWalletsListPage';

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
    public readonly operationalPage: OperationalWalletsListPage;
    
    /** The page instance dedicated to managing merchant-specific wallets and their transaction histories */
    public readonly merchantPage: MerchantWalletsListPage
    
    /** The page instance dedicated to managing individual customer wallets and balances */
    public readonly customerPage: CustomerWalletsListPage;

    /**
     * Initializes a new instance of the WalletsPage class
     * Sets up the secondary tab navigation and instantiates all specialized wallet category pages
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.tab = new Tab(page, 1);
        this.operationalPage = new OperationalWalletsListPage(page);
        this.merchantPage = new MerchantWalletsListPage(page);
        this.customerPage = new CustomerWalletsListPage(page);

    }
}