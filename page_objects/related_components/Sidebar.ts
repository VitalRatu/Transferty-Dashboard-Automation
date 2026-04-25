import { Page, Locator, expect } from '@playwright/test';

export type SidebarButtonName = 
    | 'Dashboard'
    | 'Projects' 
    | 'Billing' 
    | 'MIDs' 
    | 'Orders' 
    | 'Transactions' 
    | 'E-money' 
    | 'Subscriptions' 
    | 'Customers'
    | 'Cards & accounts'
    | 'Invoices'
    | 'Reports'
    | 'Monitoring'

    | 'API keys'
    | 'Documentation'

    | 'Configurations'
    | 'Users'
    | 'Lists'
    | 'Partners'

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

    public async getAvailableSidebarTabs(): Promise<SidebarButtonName[]>
    {
        
        await expect(this.pageLoaded).toBeHidden();
        const labels = await this.sideButton.allInnerTexts();
        return labels.map(l => l.trim()) as SidebarButtonName[];
    }

    public async openSidebarTab(buttonName: SidebarButtonName): Promise<boolean>
    {
        await expect(this.pageLoaded).toBeHidden();
        
        const button = this.sideButton.getByText(buttonName, { exact: true });

        try 
        {
            await button.waitFor({ state: 'visible', timeout: 3000 });
        } 
        catch (error) 
        {
            return false;
        }

        const parentItem = button.locator('xpath=..');
        const className = await parentItem.getAttribute('class') || await button.getAttribute('class') || '';
        
        if (className.includes('disabled')) 
        {
            return false;
        }

        if (className.includes('active')) 
        {
            return true;
        }

        await button.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.pageLoaded).toBeHidden();

        const cleanPattern = buttonName.toLowerCase().replace(/-/g, '').replace(/\s*&\s*|\s+/g, '.*');
        await expect(this.page).toHaveURL(new RegExp(cleanPattern));

        return true;
    }

}