import { Page, Locator, expect } from '@playwright/test';
import { AllTabs} from '../../page_data/TabNames';

/**
 * Represents a tab navigation component within the application
 * Provides methods to switch between tabs and retrieve tab metadata, supporting multiple tab menus
 * on a single page via index-based container selection
 */
export class Tab
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** Locator for the individual tab items within the specific container */
    private readonly item: Locator;
    
    /** Locator for the specific tab menu container identified by its index */
    private readonly container: Locator;

    /**
     * Initializes a new instance of the Tab class
     * Locates the appropriate tab menu container based on the provided index, which is useful 
     * for pages with nested or multiple secondary menus
     * @param page - The Playwright Page instance
     * @param menuIndex - The zero-based index of the '.ui.pointing.secondary.menu' container to target
     */
    constructor(page: Page, menuIndex: number = 0) 
    {
        this.page = page;
        const allMenus: Locator = page.locator('.ui.pointing.secondary.menu');
        this.container = allMenus.nth(menuIndex);
        this.item = this.container.locator('.item');
    }

    /**
     * Navigates to a specific tab identified by its display name
     * If the target tab is already marked as active via its class attribute, the method returns early 
     * without performing a redundant click, then asserts that the tab has the active state
     * @param tabIdentifier - The exact text name of the tab to switch to as defined in AllTabs
     * @returns A promise that resolves when the tab is confirmed to be in the active state
     */
    public async open(tabIdentifier: string): Promise<void> 
    {
        let tab = this.item.getByText(tabIdentifier, { exact: true });
        const classAttribute: string | null = await tab.getAttribute('class');
        if(classAttribute?.includes('active'))
        {
            return;
        }
        await tab.click();
        await expect(tab).toHaveClass(/active/);
    }

    /**
     * Collects and returns the inner text of all tabs available within the current container
     * Waits for the first tab to become visible to ensure the component is fully loaded before extraction
     * @returns A promise that resolves to an array of strings representing each tab's name
     */
    public async getAllTabNames(): Promise<string[]>
    {
        await this.item.first().waitFor({ state: 'visible' });
        const tabCount: number = await this.item.count();
        const tabNames: string[] = [];
        for (let i = 0; i < tabCount; i++)
        {
            const tabText: string = await this.item.nth(i).innerText();
            tabNames.push(tabText);
        }
        return tabNames;
    }
}