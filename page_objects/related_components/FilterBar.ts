import { expect, Locator, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path/win32';

/**
 * Represents the Filter Bar component used for searching, filtering, and performing actions on data tables
 * Provides comprehensive methods for text-based searches, dropdown selections, managing dynamic "More" filters,
 * and handling primary/secondary action buttons
 */
export class FilterBar 
{
    /** The Playwright Page instance */
    public readonly page: Page;
    
    /** Base locator for the outer filter bar wrapper */
    private readonly filterWrapper: Locator;
    
    /** Base locator for the main container holding the filter items */
    private readonly filterBaseLocator: Locator;
    
    /** Locator for the container holding action buttons (e.g., Primary, Secondary) */
    private readonly actionsContainer: Locator;
    
    /** Locator for individual filter item triggers within the bar */
    private readonly filterItems: Locator;
    
    /** Locator for the universal search input field within an open filter */
    private readonly searchInput: Locator;
    
    /** Locator for the button that resets all applied filters */
    private readonly resetButton: Locator;
    
    /** Locator for the table refresh button */
    private readonly refreshLocator: Locator;
    
    /** Locator for the button that opens the additional filters dropdown */
    private readonly moreFilterButton: Locator;
    
    /** Locator for the menu containing additional "hidden" filters */
    private readonly moreFilterDropdownMenu: Locator;
    
    /** Locator for individual options within the "More" filters menu */
    private readonly moreFilterDropdownMenuItem: Locator;
    
    /** Selector string for checkboxes inside the "More" filters dropdown */
    private readonly checkboxLocatorString: string;
    
    /** Locator for the secondary action button in the bar */
    private readonly secondaryButton: Locator;
    
    /** Locator for the primary action button in the bar */
    private readonly primaryButton: Locator;

    /** Locator for the currency equivalent toggle switch */
    private readonly showInEurToggleLocator: Locator;

    /**
     * Initializes a new instance of the FilterBar class
     * Sets up complex locators for the wrapper, filter items, search fields, and various action buttons
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.filterWrapper = page.locator(".filter-wrapper:visible");
        this.filterBaseLocator = this.filterWrapper.locator(".filter-container");
        this.actionsContainer = this.filterWrapper.locator(".after-filters-content, .actions-container");
        this.filterItems = this.filterBaseLocator.locator(".filter-item");
        this.searchInput = this.filterBaseLocator.locator(".filter-search-input");
        this.resetButton = this.filterBaseLocator.locator("#reset-filters-button");
        this.refreshLocator = this.filterWrapper.locator("#table-refresh-button");
        this.moreFilterButton = this.filterBaseLocator.locator("#filter-dropdown-button");
        this.moreFilterDropdownMenu = this.filterWrapper.locator("#filter-dropdown-menu");
        this.moreFilterDropdownMenuItem = this.filterWrapper.getByRole("option");
        this.checkboxLocatorString = 'input[type="checkbox"]';
        this.showInEurToggleLocator = this.filterWrapper.locator("#show-in-equivalent-checkbox");
        this.primaryButton = this.actionsContainer.locator(".ui.primary.button, .ui.button.submit-button, ui.button"); 
        this.secondaryButton = this.actionsContainer.locator('.ui.secondary.button');
    }

    /**
     * Internal method to open a specific filter dropdown by its visible name
     * @param name - The text label of the filter to be clicked (e.g., "Status")
     * @returns A promise that resolves when the filter dropdown is opened
     */
    private async openFilter(name: string): Promise<void> 
    {
        const filterButton = this.filterItems.filter({ hasText: name });
        await expect(filterButton).toBeVisible();
        await filterButton.click();
    }
    
    /**
     * Filters the data by entering a specific string into a filter's text input field
     * Useful for searching specific IDs, hashes, or emails
     * @param filterName - The name of the filter category to activate
     * @param value - The text to type into the search field
     * @returns A promise that resolves when the value is entered and submitted via the Enter key
     */
    public async filterByText(filterName: string, value: string): Promise<void> 
    {
        await this.openFilter(filterName);
        await this.searchInput.fill(value);
        await expect(this.searchInput).toHaveValue(value);
        await this.page.keyboard.press("Enter");
    }

    /**
     * Filters the data by selecting a predefined value from a dropdown list
     * Automatically verifies that the selected option text is displayed on the filter item after selection
     * @param filterName - The name of the filter category (e.g., "Currency")
     * @param optionName - The exact text of the option to select (e.g., "EUR")
     * @returns A promise that resolves after the option is selected and submitted
     */
    public async filterByOption(filterName: string, optionName: string): Promise<void> 
    {
        await this.openFilter(filterName);
        await this.page
            .getByRole("option", { name: optionName, exact: true })
            .click();
        await expect(
            this.filterItems.filter({ hasText: filterName }),
        ).toContainText(`${optionName}`);
        await this.page.keyboard.press("Enter");
    }

    /**
     * Clears all currently applied filters by clicking the global reset button
     * @returns A promise that resolves when the reset action is completed
     */
    public async reset(): Promise<void> 
    {
        await this.resetButton.click();
    }

    /**
     * Refreshes the table data and waits for a specific successful API response
     * Ensures that the ListOrders network request completes with a 200 status before proceeding
     * @throws {Error} If the network request fails or times out
     * @returns A promise that resolves when the table refresh and network synchronization are complete
     */
    public async refreshTable(): Promise<void> 
    {
        try 
        {
            await Promise.all([
                this.page.waitForResponse((response) => 
                {
                    return (
                        response
                            .url()
                            .includes("/api/tnxprocessor.v1.OrderService/ListOrders") &&
                        response.status() === 200 &&
                        response.request().method() === "POST"
                    );
                }),
                this.refreshLocator.click(),
            ]);
        }
        catch (error) 
        {
            throw error;
        }
    }

    /**
     * Displays the "More" filters dropdown menu to reveal hidden filter options
     * @returns A promise that resolves when the menu becomes visible
     */
    public async openMoreOptionFilter(): Promise<void> 
    {
        await this.moreFilterButton.click();
        await expect(this.moreFilterDropdownMenu).toBeVisible();
    }

    /**
     * Retrieves the names of all filter options available within the "More" dropdown
     * Automatically opens the dropdown if it is currently hidden
     * @returns A promise that resolves to an array of available filter names
     */
    public async getAllAvailableFilterNames(): Promise<string[]> 
    {
        if (!(await this.moreFilterDropdownMenu.isVisible())) 
        {
            await this.openMoreOptionFilter();
        }
        return await this.moreFilterDropdownMenuItem.allTextContents();
    }

    /**
     * Determines if a specific filter checkbox is currently enabled in the "More" dropdown
     * @param filterName - The name of the filter to check
     * @returns A promise that resolves to a boolean indicating the checked state
     */
    public async isFilterEnabled(filterName: string): Promise<boolean> 
    {
        if (!(await this.moreFilterDropdownMenu.isVisible())) 
        {
            await this.openMoreOptionFilter();
        }
        const option: Locator = this.moreFilterDropdownMenuItem.filter({ hasText: filterName });
        await expect(option).toBeVisible();
        return await option.locator(this.checkboxLocatorString).isChecked();
    }

    /**
     * Activates a specific filter in the "More" dropdown if it is not already enabled
     * Verifies that the checkbox state reflects the change after the click
     * @param filterName - The name of the filter to enable
     * @returns A promise that resolves once the filter is confirmed as enabled
     */
    public async enableFilter(filterName: string): Promise<void> 
    {
        const isEnabled = await this.isFilterEnabled(filterName);
        if (!isEnabled) 
        {
            const option: Locator = this.moreFilterDropdownMenuItem.filter({ hasText: filterName });
            await option.click();
            await expect(option.locator(this.checkboxLocatorString)).toBeChecked();
        }
    }

    /**
     * Deactivates a specific filter in the "More" dropdown if it is currently enabled
     * @param filterName - The name of the filter to disable
     * @returns A promise that resolves once the filter is confirmed as disabled
     */
    public async disableFilter(filterName: string): Promise<void> 
    {
        const isEnabled = await this.isFilterEnabled(filterName);
        if (isEnabled) 
        {
            const option: Locator = this.moreFilterDropdownMenuItem.filter({ hasText: filterName });
            await option.click();
            await expect(option.locator(this.checkboxLocatorString)).not.toBeChecked();
        }
    }

    public async exportCsv(): Promise<void> 
    {
        await this.page.waitForLoadState('networkidle');
        
        await expect(this.secondaryButton).toBeVisible();

        const tempFilePath = path.join(process.cwd(), `export_${Date.now()}.csv`);

        const downloadPromise = this.page.waitForEvent('download');
        
        await this.clickSecondaryButton();
        
        const download = await downloadPromise;

        await download.saveAs(tempFilePath);

        try 
        {

            const stats = fs.statSync(tempFilePath);

            expect(stats.size, 'CSV file should not be empty').toBeGreaterThan(0);
        } 
        finally 
        {
            if (fs.existsSync(tempFilePath)) 
            {
                fs.unlinkSync(tempFilePath);
            }
        }
    }

    /**
     * Clicks the primary action button and waits for a URL navigation to occur
     * Typically used for "Create" or "Add" actions located in the filter bar
     * @returns A promise that resolves when the page navigates away from the current URL
     */
    public async clickPrimaryButton(buttonName?: string): Promise<void> 
    {
        if (buttonName)
        {
            const button = this.primaryButton.getByText(buttonName, {exact: true})
            await expect(button).toBeVisible();
            await button.click();
        }
        await expect(this.primaryButton).toBeVisible();
        await this.primaryButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Clicks the secondary action button and waits for the resulting URL navigation
     * Typically used for secondary actions like "Export" or "Bulk Edit"
     * @returns A promise that resolves when navigation is complete
     */
    public async clickSecondaryButton(buttonName?: string): Promise<void> 
    {
        if (buttonName)
        {
            const button = this.secondaryButton.getByText(buttonName, {exact: true})
            await expect(button).toBeVisible();
            await button.click();
        }
        await expect(this.secondaryButton).toBeVisible();
        await this.secondaryButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Toggles the "Show in EUR" equivalent checkbox state
     * Analyzes the current class to determine if the switch is active and performs a toggle click
     * to reach the opposite state, followed by an assertion to verify the change
     * @throws {Error} If the toggle component is not found or visible
     * @returns A promise that resolves when the toggle action and verification are complete
     */
    public async showInEurToggle(): Promise<void>
    {
        await expect(this.showInEurToggleLocator).toBeVisible().catch((error) => 
        {
            throw new Error(`Show in EUR toggle is not visible: ${error}`);
        });
        const classAttr = await this.showInEurToggleLocator.getAttribute('class');
        const isCurrentlyChecked = classAttr?.includes('checked');
        if (isCurrentlyChecked) 
        {
            await this.showInEurToggleLocator.click();
            await expect(this.showInEurToggleLocator).toHaveClass(/checked/);
        }
        else if (!isCurrentlyChecked) 
        {
            await this.showInEurToggleLocator.click();
            await expect(this.showInEurToggleLocator).not.toHaveClass(/checked/);
        }
    }
}