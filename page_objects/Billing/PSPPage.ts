import { Page, Locator, expect } from '@playwright/test';
import { PSPsubtab } from './PSP/PSPsubtab';
import { IntermediaryPage } from './PSP/IntermediaryPage';
import { Orchestrator } from '../Orchestrator';

export type PSPTabName = 
    | 'PSP' 
    | 'Intermediary' 

/**
 * Acts as the primary management hub for Payment Service Providers (PSPs)
 * This class orchestrates navigation between core PSP configurations and 
 * intermediary entities using a secondary tab system
 */
export class PSPPage extends Orchestrator<PSPTabName>
{
    /** The sub-component dedicated to managing detailed PSP records and settings */
    public readonly pspSubtab: PSPsubtab;
    
    /** The component responsible for managing financial intermediaries within the payment ecosystem */
    public readonly intermediaryPage: IntermediaryPage;

    /**
     * Initializes a new instance of the PSPPage class
     * Sets up the secondary tab navigation and instantiates sub-pages for providers and intermediaries
     * @param page - The Playwright Page instance
     * @param tabDepth - The depth of the tab navigation
     */
    constructor(page: Page, tabDepth: number = 0) 
    {
        super(page, tabDepth);
        this.pspSubtab = new PSPsubtab(page, tabDepth + 1 );
        this.intermediaryPage = new IntermediaryPage(page, tabDepth + 1);
    }
}