import { Page} from '@playwright/test';
import { MerchantWalletsListPage } from '.././Wallets/Merchant/MerchantWalletsListPage';
import { CustomerWalletsListPage } from '.././Wallets/Customer/CustomerWalletsListPage';
import { OperationalWalletsListPage } from '.././Wallets/Operational/OperationalWalletsListPage';
import { Orchestrator } from '../../Orchestrator';

export type WalletsTabName = 
    | 'Operational' 
    | 'Merchant' 
    | 'Customer' 

export class WalletsPage extends Orchestrator<WalletsTabName>
{
    
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
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth);
        this.operationalPage = new OperationalWalletsListPage(page);
        this.merchantPage = new MerchantWalletsListPage(page);
        this.customerPage = new CustomerWalletsListPage(page);

    }
}