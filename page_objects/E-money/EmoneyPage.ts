import { Page } from '@playwright/test';
import { Tab } from '../related_components/Tab';
import { WalletsPage } from './Wallets/WalletsPage';
import { SettingsPage } from './Settings/SettingsPage';
import { LedgerPage } from './Ledger/LedgerPage';

/**
 * Acts as the primary orchestrator for the E-money section of the application
 * This page consolidates various financial modules including digital wallets, transaction ledgers, 
 * and specific E-money settings, allowing for centralized management of electronic currency flows
 */
export class EmoneyPage
{
    /** The primary Tab component used to navigate between Wallets, Ledger, and Settings modules */
    public readonly tab: Tab;
    
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
        this.tab = new Tab(page, tabDepth);
        this.walletsPage = new WalletsPage(page, tabDepth + 1);
        this.ledgerPage = new LedgerPage(page);
        this.settingsPage = new SettingsPage(page);
    }
}