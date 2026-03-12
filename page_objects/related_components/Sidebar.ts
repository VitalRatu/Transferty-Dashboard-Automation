import { Page, Locator, expect } from '@playwright/test';
import { executionAsyncId } from 'node:async_hooks';
import { error, time } from 'node:console';
import { SideBarMenuButtons } from '../../page_data/SideBarMenuButtons';

/**
 * Represents the Sidebar navigation component of the application
 * Provides methods for navigating through the main menu items and toggling global application modes like Live Mode
 */
export class Sidebar
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** Locator for the text labels of sidebar menu items */
    private readonly sideButton: Locator;
    
    /** Locator for the mode toggle switch container */
    private readonly toggleContainer: Locator;
    
    /** Locator for the global page loader to ensure synchronization during navigation */
    private readonly pageLoaded: Locator;
    
    /**
     * Initializes a new instance of the Sidebar class
     * Sets up locators for navigation buttons, the mode toggle, and the loading indicator
     * @param page - The Playwright Page instance
     */
    constructor(page: Page)
        {
            this.page = page;
            this.toggleContainer = page.locator('.ui.toggle.checkbox');
            this.sideButton = page.locator('.sidebar-item-label');
            this.pageLoaded = page.locator('.ui.inverted.text.loader').first();
        }
    
    /**
     * Interacts with the Live Mode toggle to change the current environment state
     * Checks the current state by analyzing the CSS class and performs a click if necessary
     * to reach the desired state, followed by an assertion to confirm the change
     * @returns A promise that resolves when the toggle action and verification are complete
     */    
    public async setLiveMode(targetState: boolean = true): Promise<void>
    {
        const currentUrl = this.page.url();
        if (!currentUrl.includes('dashboard')) 
        {
            throw new Error(`CRITICAL: Cannot find Live Mode toggle because we are on the wrong page! Current URL is: ${currentUrl}`);
        }

        await expect(this.toggleContainer).toBeVisible({ timeout: 20000 })
        const classAttr = await this.toggleContainer.getAttribute('class');
        const isCurrentlyChecked = classAttr?.includes('checked') ?? false;

        if (targetState && !isCurrentlyChecked) 
        {
            await this.toggleContainer.click();
            await expect(this.toggleContainer).toHaveClass(/checked/);
        }
        else if (!targetState && isCurrentlyChecked) 
        {
            await this.toggleContainer.click();
            await expect(this.toggleContainer).not.toHaveClass(/checked/);
        }
    }
    /**
     * Navigates to a specific section of the application by clicking a sidebar menu button
     * Waits for any active loaders to disappear, locates the button by its display name, 
     * and asserts that the resulting URL matches the expected pattern derived from the button name
     * @param buttonName - The name of the sidebar button to click as defined in SideBarMenuButtons
     * @returns A promise that resolves when the navigation and URL verification are complete
     */
    public async clickButton(buttonName: SideBarMenuButtons): Promise<void>
    {
        await expect(this.pageLoaded).toBeHidden();
        const button = this.sideButton.filter({ hasText: buttonName });
        await expect(button).toBeVisible(); 
        await button.click();
        await expect(this.page).toHaveURL(new RegExp(buttonName.toLowerCase().replace(/-/g, '')));
    }

}