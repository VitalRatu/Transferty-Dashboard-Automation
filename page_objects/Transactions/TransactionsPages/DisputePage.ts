import { Page, expect } from '@playwright/test';
import { FilterBar } from '../../related_components/FilterBar';
import { Table } from '../../related_components/Table';
import { BasePage } from '../../BasePage';

export type DisputePageTabName = 
{
    'Project': string
    'Dispute ID': string
    'External ID': string
    'Provider': string
    'PSP': string
    'Tx ID': string
    'Currency': string
    'Category': 'Fraud' | 'Customer disputed' | 'Processing Errors' | 'Authorization' | 'Other' 
    'Status': 'Open' | 'In progress' | 'Won' | 'Lost' | 'Canceled'
    'Created': string
}
/**
 * Represents the Dispute page in the application for managing chargebacks and transaction disputes
 * Encapsulates the filter bar and data table components specific to dispute records
 */
export class DisputePage extends BasePage
{
    /** The FilterBar component used to search disputes and initiate the creation of new ones */
    public readonly filter: FilterBar<DisputePageTabName>;
    
    /** The Table component used to display and interact with the grid of dispute records */
    public readonly table: Table;

    /**
     * Initializes a new instance of the DisputePage class
     * Instantiates the related sub-components like the filter bar and the data table
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        super(page, /\/transactions\/disputes/)
        this.filter = new FilterBar<DisputePageTabName>(page);
        this.table = new Table(page);
    }

    /**
     * Initiates the creation of a new dispute by clicking the primary action button in the filter bar
     * Asserts that the browser successfully navigates to the expected dispute creation URL
     * @returns A promise that resolves when the navigation and URL assertion are complete
     */
    public async CreateNewDispute(): Promise<void>
    {
        await this.filter.clickPrimaryButton();
        await expect(this.page).toHaveURL(/\/disputes\/add/); 
    }
}