import { expect, Locator, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path/win32';

export type FilterKey<T> = T extends string ? T : keyof T;

export type FilterValue<T, K> = T extends Record<string, string> 
    ? (K extends keyof T ? T[K] : string) 
    : string;


export class FilterBar<T extends string | Record<string, string>>
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
        this.resetButton = this.filterBaseLocator.locator("#reset-filters-button");
        this.refreshLocator = this.filterWrapper.locator("#table-refresh-button");
        this.moreFilterButton = this.filterBaseLocator.locator("#filter-dropdown-button");
        this.moreFilterDropdownMenu = this.filterWrapper.locator("#filter-dropdown-menu");
        this.moreFilterDropdownMenuItem = this.filterWrapper.getByRole("option");
        this.checkboxLocatorString = 'input[type="checkbox"]';
        this.showInEurToggleLocator = this.filterWrapper.locator("#show-in-equivalent-checkbox");
        
        this.primaryButton = this.actionsContainer.locator(".ui.primary.button, .ui.button.submit-button"); 
        this.secondaryButton = this.actionsContainer.locator('.ui.secondary.button');
    }

    private getFilterItemLocator(filterName: FilterKey<T>): Locator 
    {
        const exactMatch = this.filterItems.filter({ 
            has: this.page.getByText(filterName as string, { exact: true }) 
        });
        
        const escapedName = String(filterName).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const withValueRegex = new RegExp(`^\\s*${escapedName}\\s*:`, 'i');
        const matchWithValue = this.filterItems.filter({ hasText: withValueRegex });

        return exactMatch.or(matchWithValue).first();
    }

    /**
     * Ensures that a filter is visible on the main filter bar.
     * If it's hidden, it attempts to find and enable it via the "More" dropdown.
     */
    private async isFilterActive(filterName: FilterKey<T>): Promise<void> 
    {
        const filterItem = this.getFilterItemLocator(filterName);

        if (await filterItem.isVisible()) 
        {
            return; 
        }

        await this.enableFilter(filterName);

        await this.page.keyboard.press('Escape');

        await expect(filterItem).toBeVisible();
    }

    /**
     * Clears the filter if it already has an active value.
     * Looks for the .smallClearBtn and clicks it.
     */
    private async clearFilter(filterName: FilterKey<T>): Promise<void> 
    {
        const filterItem = this.getFilterItemLocator(filterName);
        
        if (await filterItem.isVisible()) 
        {
            const clearBtn = filterItem.locator('.smallClearBtn');
            if (await clearBtn.count() > 0 && await clearBtn.isVisible()) 
            {
                await clearBtn.click();
                await expect(clearBtn).toBeHidden();
                await this.page.waitForLoadState('networkidle');
            }
        }
    }

    /**
     * Internal method to open a specific filter dropdown by its visible name
     * @param name - The text label of the filter to be clicked (e.g., "Status")
     * @returns A promise that resolves when the filter dropdown is opened
     */
    private async openFilter(name: FilterKey<T>): Promise<void> 
    {
        const filterItem = this.getFilterItemLocator(name);
        await expect(filterItem).toBeVisible();
        await filterItem.click();
    }
    
    /**
     * Filters the data by entering a specific string into a filter's text input field
     * Useful for searching specific IDs, hashes, or emails
     * @param filterName - The name of the filter category to activate
     * @param value - The text to type into the search field
     * @returns A promise that resolves when the value is entered and submitted via the Enter key
     */
    public async filterByText(filterName: FilterKey<T>, value: string): Promise<void> 
    {
        await this.isFilterActive(filterName);
        
        await this.clearFilter(filterName);
        
        await this.openFilter(filterName);
        
        const filterItem = this.getFilterItemLocator(filterName);
        const scopedSearchInput = filterItem.locator('.filter-search-input');
        
        await scopedSearchInput.fill(value);
        await expect(scopedSearchInput).toHaveValue(value);
        await this.page.keyboard.press("Enter");
        
        await this.page.waitForLoadState('networkidle');
    }

    
    public async filterByOption<K extends FilterKey<T>>(filterName: K, optionName: FilterValue<T, K>): Promise<void>
    {
        await this.isFilterActive(filterName);
        
        await this.clearFilter(filterName);
        
        await this.openFilter(filterName);
        
        await this.page
            .getByRole("option", { name: optionName, exact: true })
            .click();
            
        await expect(
            this.getFilterItemLocator(filterName)
        ).toContainText(`${optionName}`);
        await this.page.keyboard.press("Enter");

        await this.page.waitForLoadState('networkidle');
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
    public async getAllAvailableFilterNames(): Promise<T[]> 
    {
        if (!(await this.moreFilterDropdownMenu.isVisible())) 
        {
            await this.openMoreOptionFilter();
        }

        return await this.moreFilterDropdownMenuItem.allTextContents() as T[];
    }

    /**
     * Determines if a specific filter checkbox is currently enabled in the "More" dropdown
     */
    public async isFilterEnabled(filterName: FilterKey<T>): Promise<boolean> 
    {
        if (!(await this.moreFilterDropdownMenu.isVisible())) 
        {
            await this.openMoreOptionFilter();
        }
        
        const option = this.moreFilterDropdownMenuItem.filter({ 
            has: this.page.getByText(filterName as string, { exact: true }) 
        });
        
        await expect(option).toBeVisible();
        return await option.locator(this.checkboxLocatorString).isChecked();
    }

    /**
     * Activates a specific filter in the "More" dropdown if it is not already enabled
     */
    public async enableFilter(filterName: FilterKey<T>): Promise<void> 
    {
        const isEnabled = await this.isFilterEnabled(filterName);
        if (!isEnabled) 
        {
            const option = this.moreFilterDropdownMenuItem.filter({ 
                has: this.page.getByText(filterName as string, { exact: true }) 
            });
            await option.click();
            await expect(option.locator(this.checkboxLocatorString)).toBeChecked();
        }
    }

    /**
     * Deactivates a specific filter in the "More" dropdown if it is currently enabled
     */
    public async disableFilter(filterName: FilterKey<T>): Promise<void> 
    {
        const isEnabled = await this.isFilterEnabled(filterName);
        if (isEnabled) 
        {
            const option = this.moreFilterDropdownMenuItem.filter({ 
                has: this.page.getByText(filterName as string, { exact: true }) 
            });
            await option.click();
            await expect(option.locator(this.checkboxLocatorString)).not.toBeChecked();
        }
    }

    public async exportCsv(): Promise<boolean> 
    {
        await this.page.waitForLoadState('networkidle');
        
        const targetButton = this.secondaryButton.first();
        
        try 
        {
            await targetButton.waitFor({ state: 'visible', timeout: 3000 });
        } 
        catch (error) 
        {
            return false;
        }

        const className = await targetButton.getAttribute('class') || '';
        const isNativeDisabled = await targetButton.isDisabled();

        if (className.includes('disabled') || isNativeDisabled)
        {
            return false;
        }

        const tempFilePath = path.join(process.cwd(), `export_${Date.now()}.csv`);
        
        const downloadPromise = this.page.waitForEvent('download');
        await targetButton.click();
        const download = await downloadPromise;
        
        await download.saveAs(tempFilePath);
        
        // 4. Валідація та очищення
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

        return true;
    }

    /**
     * Clicks the primary action button and waits for a URL navigation to occur.
     * Checks if the button is disabled before clicking to support negative testing.
     * Typically used for "Create" or "Add" actions located in the filter bar
     * @param buttonName - Optional exact text of the button to click
     * @returns Promise<boolean> - true if clicked successfully, false if disabled
     */
    public async clickPrimaryButton(buttonName?: string): Promise<boolean>
    {
        const targetButton = buttonName
            ? this.primaryButton.getByText(buttonName, { exact: true })
            : this.primaryButton.first();

        try 
        {
            await targetButton.waitFor({ state: 'visible', timeout: 3000 });
        } 
        catch (error) 
        {
            return false;
        }

        const className = await targetButton.getAttribute('class') || '';
        const isNativeDisabled = await targetButton.isDisabled();

        if (className.includes('disabled') || isNativeDisabled)
        {
            return false;
        }

        await targetButton.click();  
        return true;
    }

    /**
     * Clicks the secondary action button and waits for the resulting URL navigation.
     * Checks if the button is disabled before clicking to support negative testing.
     * Typically used for secondary actions like "Export" or "Bulk Edit"
     * @param buttonName - Optional exact text of the button to click
     * @returns Promise<boolean> - true if clicked successfully, false if disabled
     */
    public async clickSecondaryButton(buttonName?: string): Promise<boolean>
    {
        const targetButton = buttonName
            ? this.secondaryButton.getByText(buttonName, { exact: true })
            : this.secondaryButton.first();

        try 
        {
            await targetButton.waitFor({ state: 'visible', timeout: 3000 });
        } 
        catch (error) 
        {
            return false;
        }

        const className = await targetButton.getAttribute('class') || '';
        const isNativeDisabled = await targetButton.isDisabled();

        if (className.includes('disabled') || isNativeDisabled)
        {
            return false;
        }

        await targetButton.click();
        await this.page.waitForLoadState('networkidle');
        
        return true;
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
            await expect(this.showInEurToggleLocator).not.toHaveClass(/checked/);
        }
        else 
        {
            await this.showInEurToggleLocator.click();
            await expect(this.showInEurToggleLocator).toHaveClass(/checked/);
        }
    }
}