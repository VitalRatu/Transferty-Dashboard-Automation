import { Locator, Page, expect } from '@playwright/test';

/**
 * A universal utility class designed to interact with and read data from View Pages (Details Pages)
 * Provides methods to extract specific field values, interact with links within fields, 
 * and perform actions via buttons on the details view
 */
export class DetailsPageReader 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** Locator for the main container that holds the details content */
    private readonly container: Locator;
    
    /** Locator for all individual field blocks within the container */
    private readonly allFields: Locator;
    
    /** Locator for all field labels (captions) across the page */
    private readonly allCaptions: Locator;

    /** Locator for all toggles inside the container */
    private readonly toggleContainer: Locator;

    /** CSS selector for the element containing the field label text */
    private readonly captionSelector = '.view-caption';
    
    /** CSS selector for the element containing the field value content */
    private readonly valueSelector = '.view-value';

    /** CSS selector for the toggle container */
    private readonly toggleSelector = '.ui.toggle.checkbox';

    /**
     * Initializes a new instance of the DetailsPageReader class
     * Sets up locators for the primary view container and its internal structural elements
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.container = page.locator('.view-page, .View-page').first();
        this.allFields = this.container.locator('.view-field');
        this.allCaptions = this.container.locator(this.captionSelector);
        this.toggleContainer = this.container.locator('.ui.toggle.checkbox');
    }

    /**
     * Retrieves the locator for a specific field block based on its label text
     * This private helper identifies the correct .view-field container by matching its child caption
     * @param label - The exact text of the field label to search for (e.g., 'Project')
     * @returns A Locator pointing to the specific field container
     */
    private getFieldLocator(label: string | RegExp): Locator 
    {
        const matchInCaption = this.page.locator(this.captionSelector).getByText(label, { exact: true });
        const matchInValue = this.page.locator(this.valueSelector).getByText(label, { exact: true });

        return this.allFields.filter(
        { 
            has: matchInCaption.or(matchInValue)
        });
    }

    /**
     * Reads the current state of a toggle within a specific field
     * @param label - The exact text of the field label
     * @returns Promise<boolean> - true if enabled, false if disabled
     */
    public async isToggleChecked(label: string | RegExp): Promise<boolean> 
    {
        const fieldLocator = this.getFieldLocator(label);
        const toggleContainer = fieldLocator.locator(this.toggleSelector);
        
        await expect(toggleContainer).toBeVisible();

        const className = await toggleContainer.getAttribute('class') || '';
        return className.includes('checked');
    }

    /**
     * Sets the state of a toggle within a specific field
     * @param label - The exact text of the field label
     * @param targetState - true to enable, false to disable
     */
    public async setToggleState(label: string | RegExp, targetState: boolean): Promise<boolean> 
    {
        const toggleContainer = this.getToggleContainerLocator(label);
        
        await expect(toggleContainer).toBeVisible();

        const className = await toggleContainer.getAttribute('class') || '';
        
        if (className.includes('disabled')) 
        {
            console.log(`Cannot change state for '${label}'. The toggle is disabled for editing.`);
            return false;
        }

        const isCurrentlyChecked = className.includes('checked');

        if (isCurrentlyChecked !== targetState) 
        {
            const labelElement = toggleContainer.locator('label');
            
            if (await labelElement.count() > 0) 
            {
                await labelElement.click({ force: true });
            } 
            else 
            {
                await toggleContainer.click({ force: true });
            }

            if (targetState) 
            {
                await expect(toggleContainer).toHaveClass(/checked/, { timeout: 10000 });
            } 
            else 
            {
                await expect(toggleContainer).not.toHaveClass(/checked/, { timeout: 10000 });
            }
            
            await this.page.waitForLoadState('networkidle');
        }

        return true;
    }

    /**
     * Extracts the trimmed text value of a specific field identified by its label
     * Automatically handles complex values containing nested spans or links by retrieving all inner text
     * @param label - The exact text of the field label to read from
     * @returns A promise that resolves to the cleaned text value of the specified field
     */
    public async getValue(label: string | RegExp): Promise<string> 
    {
        const fieldLocator = this.getFieldLocator(label);
        await expect(fieldLocator).toBeVisible();
        
        const text = await fieldLocator.locator(this.valueSelector).innerText();
        
        return text.trim();
    }

    /**
     * Performs a click action on the value associated with a specific label
     * Prioritizes actual HTML anchor tags (<a>) for navigation, falling back to span elements if no link is present
     * @param label - The exact text of the field label whose value should be clicked
     * @returns A promise that resolves when the click action is completed
     */
    public async clickValueLink(label: string): Promise<void> 
    {
        const fieldLocator = this.getFieldLocator(label);
        await expect(fieldLocator).toBeVisible();
        
        const valueContainer = fieldLocator.locator(this.valueSelector);
        
        const link = valueContainer.locator('a').first();
        
        if (await link.isVisible()) 
        {
            await link.click();
        } 
        else 
        {
            const span = valueContainer.locator('span').first();
            await expect(span).toBeVisible();
            await span.click();
        }
    }

    /**
     * Interacts with global action buttons on the details page (e.g., 'Edit', 'Suspend')
     * Uses the accessible name of the button for location, making the method resilient to style changes
     * @param buttonName - The exact visible text of the button to click
     * @returns A promise that resolves when the button is successfully clicked
     */
    public async clickActionButton(buttonName: string): Promise<void> 
    {
        const button = this.page.getByRole('button', { name: buttonName, exact: true });
        await expect(button).toBeVisible();
        await button.click();
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Scans the view container and returns an array of all available field names (labels)
     * Useful for performing structural assertions on the details page layout
     * @returns A promise that resolves to an array of trimmed strings representing all field labels
     */
    public async getAllFieldNames(): Promise<string[]> 
    {
        const captionsLocator = this.allCaptions.locator('span');
        
        const texts = await captionsLocator.allInnerTexts();
        
        return texts.map(text => text.trim());
    }

    /**
     * Parses the entire details container and extracts all visible fields into a key-value object
     * Iterates through every field block to map labels to their corresponding text values
     * @returns A promise that resolves to a record where keys are field labels and values are field texts
     */
    public async getAllFieldsAndValues(): Promise<Record<string, string>> 
    {
        await this.page.waitForLoadState('networkidle');
        await this.allFields.first().waitFor({ state: 'visible', timeout: 10000 });
        
        const result: Record<string, string> = {};
        
        const fields = await this.allFields.all();
        
        for (const field of fields) 
        {
            const captionText = await field.locator(this.captionSelector).innerText();
            let cleanCaption = captionText.trim();
            let cleanValue = '';

            const toggleContainer = field.locator(this.toggleSelector);
            
            if (await toggleContainer.count() > 0) 
            {
                const className = await toggleContainer.first().getAttribute('class') || '';
                
                const isChecked = className.includes('checked');
                
                cleanValue = isChecked ? 'True' : 'False';

                if (!cleanCaption) 
                {
                    const textNextToToggle = await field.locator(this.valueSelector).innerText();
                    cleanCaption = textNextToToggle.replace(/\n/g, ' ').trim();
                }
            } 
            else 
            {
                const valueText = await field.locator(this.valueSelector).innerText();
                cleanValue = valueText.replace(/\n/g, ' ').trim();
            }

            if (cleanCaption) 
            {
                result[cleanCaption] = cleanValue;
            }
        }
        await this.page.waitForLoadState('networkidle');
        return result;
    }

    public getToggleContainerLocator(label: string | RegExp): Locator 
    {
        const dynamicLabel = typeof label === 'string' 
            ? new RegExp(label.replace(/^De/i, ''), 'i') 
            : label;
        
        const fieldLocator = this.getFieldLocator(dynamicLabel);
        return fieldLocator.locator(this.toggleSelector).first();
    }
}