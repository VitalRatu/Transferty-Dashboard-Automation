import { BasePage } from '../BasePage';
import { Page } from 'playwright';

/**
 * Represents the main landing page of the application after successful authentication
 * Acts as a central hub providing a high-level overview of system metrics, recent activities, 
 * and quick navigation links to other primary modules
 */
export class DashboardPage extends BasePage 
{
    /**
     * Initializes a new instance of the DashboardPage class
     * Sets the base navigation route specifically for the dashboard endpoint
     * @param page - The Playwright Page instance used for browser interactions
     */
    constructor(page: Page) 
    {
        super(page, /\/dashboard/);
    }
}