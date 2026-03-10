import { expect, Locator, Page } from '@playwright/test';
import { Header } from './related_components/Header';
import { Sidebar } from './related_components/Sidebar';

/**
 * Abstract base class for all Page Object models in the application
 * Provides common structural components (like Header and Sidebar), global locators 
 * (like error toasts), and foundational navigation methods shared across all pages
 */
export abstract class BasePage 
{
    /** The Playwright Page instance used to interact with the browser context. */
    public readonly page: Page;
    
    /** The default URL or URL pattern associated with the specific page. */
    protected readonly url?: string;

    /** The application's top navigation header component. */
    public readonly header: Header;
    
    /** The application's side navigation menu component. */
    public readonly sidebar: Sidebar;

    /** Locator for the main container of the error toast notification. */
    private readonly errorToastLocator: Locator;

    /** Locator for the text content within the error toast notification. */
    private readonly errorToastContent: Locator;

    /**
     * Initializes a new instance of the BasePage class
     * Sets up the shared layout components and global error notification locators
     * @param page - The Playwright Page instance
     * @param url - The optional default URL route or pattern for this page
     */
    constructor(page: Page, url?: string) 
    {
        this.page = page;
        this.url = url;

        this.header = new Header(page);
        this.sidebar = new Sidebar(page);

        this.errorToastLocator = page.locator('.react-toast-notifications__toast--error');
        this.errorToastContent = this.errorToastLocator.locator('.react-toast-notifications__toast_content');
    }

    /**
     * Pauses execution until the browser's current URL matches the page's predefined URL pattern
     * Uses a regular expression match to allow for dynamic URL segments or query parameters
     * @throws {Error} If the `url` property was not defined when the page object was instantiated
     * @returns A promise that resolves when the URL assertion passes
     */
    public async waitTillURL(): Promise<void> 
    {
        if (!this.url) 
        {
            throw new Error('URL is not defined');
        }
        await expect(this.page).toHaveURL(new RegExp(this.url));
    }
    
    /**
     * Navigates the browser to a specified URL or the page's default URL
     * After navigation, it waits for the target URL to be fully loaded and matched in the browser
     * @param url - An optional specific URL to navigate to. If omitted, falls back to the class's `url` property
     * @throws {Error} If neither the argument nor the class `url` property is provided
     * @returns A promise that resolves when the navigation and URL assertion are complete
     */
    public async goTo(url?: string): Promise<void> 
    {
        const targetUrl: string | undefined = url ?? this.url;
        if (!targetUrl) 
        {
             throw new Error('No URL provided for navigation');
        }
        await this.page.goto(targetUrl);
        await this.page.waitForURL(new RegExp(targetUrl))
    }

    /**
     * Triggers a browser reload for the current active page
     * @returns A promise that resolves when the page has finished reloading
     */
    public async reload(): Promise<void> 
    {
        await this.page.reload();
    }

    /**
     * Retrieves the current active URL from the browser
     * @returns A promise that resolves to the current URL string
     */
    public async getCurrentUrl(): Promise<string>
    {
        return this.page.url();
    }

    /**
     * Asserts that a red error toast notification (pop-up) appears on the screen 
     * and verifies that its content matches the expected text or pattern
     * @param expectedMessage - The exact string or regular expression expected inside the error toast
     * @returns A promise that resolves when both the toast is visible and the text matches
     */
    public async checkForError(expectedMessage: string | RegExp): Promise<void> 
    {
        await expect(this.errorToastLocator).toBeVisible();
        await expect(this.errorToastContent).toHaveText(expectedMessage);
    }
}