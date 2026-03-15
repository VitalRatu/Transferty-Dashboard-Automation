import { BasePage } from '../BasePage';
import { Page } from '@playwright/test';
import { Routes } from '../../page_data/routes';
import { Tab } from '../related_components/Tab';
import { SecureDepositsListPage } from '..//MIDs/SecureDeposits/SecureDepositsListPage';
import { InternalMidsListPage } from '../MIDs/InternalMIDs/InternalMidsListPage';
import { AggregatedMidsListPage } from './AggregatedMIDs/AggregatedMidsListPage';
import { ExternalMidsListPage } from './ExternalMIDs/ExternalMidsListPage';

/**
 * Acts as the central orchestrator for the Merchant Identifiers (MIDs) management section
 * This page aggregates various MID types including Secure Deposits, Internal, Aggregated, and External MIDs,
 * providing a unified interface to navigate between them using a tab-based system
 */
export class MIDsPage extends BasePage 
{
    /** The Tab component used to switch between different MID categories and management pages */
    public readonly tab: Tab;
    
    /** The page instance dedicated to managing Secure Deposit settings and records */
    public readonly secureDeposits: SecureDepositsListPage;
    
    /** The page instance dedicated to managing Internal Merchant Identifiers */
    public readonly internalMids: InternalMidsListPage;
    
    /** The page instance dedicated to managing Aggregated Merchant Identifiers */
    public readonly aggregatedMids: AggregatedMidsListPage;
    
    /** The page instance dedicated to managing External Merchant Identifiers from third-party providers */
    public readonly externalMids: ExternalMidsListPage;

    /**
     * Initializes a new instance of the MIDsPage class
     * Sets the base navigation route for MIDs and instantiates all specialized sub-pages and navigation components
     * @param page - The Playwright Page instance used for browser interactions
     */
    constructor(page: Page) 
    {
        super(page, Routes.MIDs); 
        this.tab = new Tab(page);
        this.secureDeposits = new SecureDepositsListPage(page);
        this.internalMids = new InternalMidsListPage(page);
        this.aggregatedMids = new AggregatedMidsListPage(page);
        this.externalMids = new ExternalMidsListPage(page);
    }

}