import { Page               } from '@playwright/test'                 ;
import { AllAdjustmentsPage } from './Adjustments/AllAdjustmentsPage' ;
import { AutoTransferPage   } from './Adjustments/AutoTransferPage'   ;
import { Orchestrator       } from '../Orchestrator'                  ;

export type AdjustmentsTabName = 
    | 'All adjustments' 
    | 'Auto-transfer by %' 

/**
 * Represents the Adjustments management hub within the Billing section
 * Provides a specialized interface for handling manual balance corrections and 
 * configuring automated fund transfers between different account types
 */
export class AdjustmentsPage extends Orchestrator<AdjustmentsTabName>
{
    
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
        super(page, tabDepth);
        this.allAdjustmentsPage = new AllAdjustmentsPage(page);
        this.autoTransferPage = new AutoTransferPage(page);
    }
}