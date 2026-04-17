import { Page, Locator, expect } from '@playwright/test';
import {Tab} from '../../page_objects/related_components/Tab';
import { AllAdjustmentsPage } from './Adjustments/AllAdjustmentsPage';
import { AutoTransferPage } from './Adjustments/AutoTransferPage';

/**
 * Represents the Adjustments management hub within the Billing section
 * Provides a specialized interface for handling manual balance corrections and 
 * configuring automated fund transfers between different account types
 */
export class AdjustmentsPage 
{
    /** The secondary navigation tab component used to toggle between adjustment logs and transfer settings */
    public readonly tab: Tab;
    
    /** The component responsible for managing and auditing automated fund movement rules */
    public readonly autoTransferPage: AutoTransferPage;
    
    /** The primary interface for viewing and creating manual balance adjustments and transaction corrections */
    public readonly allAdjustmentsPage: AllAdjustmentsPage;

    /**
     * Initializes a new instance of the AdjustmentsPage class
     * Sets up the tab-based navigation and instantiates sub-modules for adjustments and transfers
     * @param page - The Playwright Page instance
     * @param tabDepth - The depth of the tab navigation
     */
    constructor(page: Page, tabDepth: number = 0) 
    {
        this.tab = new Tab(page, tabDepth);
        this.allAdjustmentsPage = new AllAdjustmentsPage(page);
        this.autoTransferPage = new AutoTransferPage(page);
    }
}