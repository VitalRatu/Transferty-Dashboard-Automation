import { BasePage } from '../BasePage';
import { Page } from '@playwright/test';
import { Table } from '../related_components/Table'; 
import { FilterBar } from '../related_components/FilterBar'; 
import { Routes } from '../../page_data/routes';

/**
 * Represents the Orders page within the application
 * Provides access to the centralized order management system, allowing users to view,
 * filter, and interact with order data through the integrated Table and FilterBar components
 */
export class OrdersListPage extends BasePage 
{
    /** The Table component used to display and manage the grid of order records */
    public readonly table: Table;
    
    /** The FilterBar component used to apply specific search criteria and manage order views */
    public readonly filters: FilterBar;

    /**
     * Initializes a new instance of the OrdersPage class
     * Sets the base navigation route to the orders endpoint and instantiates the table and filter components
     * @param page - The Playwright Page instance used for browser interactions
     */
    constructor(page: Page) 
    {
        super(page, Routes.ORDERS); 

        this.table = new Table(page); 

        this.filters = new FilterBar(page);
    }
}