import { Page } from '@playwright/test';
import { WalletsPage } from './Wallets/WalletsPage';
import { SettingsPage } from './Settings/SettingsPage';
import { LedgerPage } from './Ledger/LedgerPage';
import { Orchestrator } from '../Orchestrator';

export type EMoneyTabName = 
    | 'Wallets' 
    | 'Ledger' 
    | 'Settings' 

export class EmoneyPage extends Orchestrator<EMoneyTabName>
{
    /** The page instance dedicated to managing digital wallets and their respective balances */
    public readonly walletsPage: WalletsPage;
    
    /** The page instance dedicated to viewing and auditing the financial ledger of E-money movements */
    public readonly ledgerPage: LedgerPage;
    
    /** The page instance dedicated to configuring specific parameters and rules for E-money operations */
    public readonly settingsPage: SettingsPage;

    /**
     * Initializes a new instance of the EmoneyPage class
     * Sets the base navigation route to the E-money endpoint and instantiates all specialized sub-pages
     * @param page - The Playwright Page instance used for browser interactions
     * @param tabDepth - The depth of the tab navigation
     */
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth);
        this.walletsPage = new WalletsPage(page, tabDepth + 1);
        this.ledgerPage = new LedgerPage(page);
        this.settingsPage = new SettingsPage(page);
    }
}