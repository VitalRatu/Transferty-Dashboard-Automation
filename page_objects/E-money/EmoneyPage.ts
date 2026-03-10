import { BasePage } from '../BasePage';
import { Page } from '@playwright/test';
import { Routes } from '../../page_data/routes';
import { Tab } from '../related_components/Tab';
import { WalletsPage } from './Wallets/WalletsPage';
import { SettingsPage } from './Settings/SettingsPage';
import { LedgerPage } from './Ledger/LedgerPage';

/**
 * Acts as the primary orchestrator for the E-money section of the application
 * This page consolidates various financial modules including digital wallets, transaction ledgers, 
 * and specific E-money settings, allowing for centralized management of electronic currency flows
 */
export class EmoneyPage extends BasePage 
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
     */
    constructor(page: Page) 
    {
        super(page, Routes.EMONEY); 
        this.tab = new Tab(page, 0);
        this.walletsPage = new WalletsPage(page);
        this.ledgerPage = new LedgerPage(page);
        this.settingsPage = new SettingsPage(page);
    }
}