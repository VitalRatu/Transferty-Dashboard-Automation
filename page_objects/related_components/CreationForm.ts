import { Locator, Page, expect } from '@playwright/test';

/**
 * Represents a generic creation and edition form component used across the application
 * Provides a robust set of methods to interact with various form elements like text inputs, 
 * dropdowns (single and multi), date pickers, and checkboxes by identifying them through their labels
 */
export class CreationForm 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** Locator for the primary submission button (e.g., Save, Create, Submit) */
    private readonly saveButton: Locator;
    
    /** Locator for the cancellation button to exit the form without saving */
    private readonly cancelButton: Locator;
    
    /** Base locator for text-based input containers */
    private readonly textInputLocator: Locator;
    
    /** Base locator for dropdown selection containers */
    private readonly dropdownLocator: Locator;
    
    /** Locator for validation error messages appearing under specific inputs */
    private readonly errorMessageLocator: Locator;
    
    /** Locator for generic label elements used for mapping inputs */
    private readonly labelElement: Locator;
    
    /** Locator for the checkbox */
    private readonly checkBoxLocator: Locator;

    /**
     * Initializes a new instance of the CreationForm class
     * Sets up multiple locators for shared form components, using flexible selectors to support 
     * different styles of buttons and input wrappers
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.saveButton = page.locator('.ui.button.submit-button, .ui.primary.button, .ui.button');
        this.cancelButton = page.locator('.ui.secondary.button').and(page.getByRole('button'));
        this.textInputLocator = page.locator('.Input.text-input, .ui.input.Input, .Input')
        this.dropdownLocator = page.locator('.Input.dropdown-input, .multi-select.Input, .Input');
        this.errorMessageLocator = page.locator('.form-input-error');
        this.labelElement = this.page.locator('span.form-input-label')
        this.checkBoxLocator = this.page.locator('.ui.checkbox, .ui.checked.checkbox')
    }

    /**
     * Internal helper to clear any pre-selected values before making a new selection
     * @param dropdownLocator - The resolved locator of the dropdown input container
     */
    private async clearDropdownValues(dropdownLocator: Locator): Promise<void> 
    {
        const removeButtons = dropdownLocator.locator('.selected-items-container .delete.icon.remove-item-button');
        const count = await removeButtons.count();
        
        for (let i = 0; i < count; i++) 
        {
            await removeButtons.first().click();
        }
    }

    /**
     * Fills a standard text input or textarea identified by its label
     * Validates that the field is visible, fills it with the provided value, and asserts 
     * that no validation errors are displayed afterwards
     * @param label - The exact text of the field label
     * @param value - The text string to enter into the field
     * @returns A promise that resolves when the field is filled and validated
     */
    public async fillInputField(label: string, value: string) 
    {
        await this.page.waitForLoadState('networkidle');
        const fieldLocator = this.textInputLocator.filter({ has: this.page.getByText(label, { exact: true })}).last();
        await expect(fieldLocator).toBeVisible();
        const inputFieldLocator = fieldLocator.locator('input, textarea').first();
        await expect(inputFieldLocator).toBeVisible();
        await inputFieldLocator.fill(value);
        await expect(inputFieldLocator).toHaveValue(value);
        await expect(this.errorMessageLocator).toBeHidden();
    }

    /**
     * Selects an option from a standard dropdown menu
     * If no option is provided, it defaults to selecting the first available option in the list
     * @param label - The exact text or RegExp of the dropdown label
     * @param option - The exact text of the option to select from the listbox
     * @throws {Error} If the dropdown is opened but contains "No options"
     * @returns A promise that resolves when the selection is made and the menu is closed
     */
    public async selectDropDown(label: string | RegExp, option?: string) 
    {
        await this.page.waitForLoadState('networkidle');
        const dropdownInput = this.dropdownLocator.filter({ has: this.page.getByText(label, { exact: true }) }).first();
        await expect(dropdownInput).toBeVisible();

        await this.clearDropdownValues(dropdownInput);

        await dropdownInput.click();
        const dropdownList = dropdownInput.getByRole('listbox').first();
        await expect(dropdownList).toBeVisible();

        const noneButton = dropdownList.getByRole('button', { name: 'None', exact: true });
        if (await noneButton.count() > 0 && await noneButton.isVisible()) 
        {
            await noneButton.click();
            await this.page.waitForTimeout(200); 
        }

        if ((await this.page.getByRole('option', { exact: true }).first().innerText()) === 'No options') 
        {
            throw new Error(`No options available`);
        }
        else if(option === undefined)
        {
            const firstOption = this.page.getByRole('option', { exact: true }).first();
            await expect(firstOption).toBeVisible();
            await firstOption.click();
        }
        else 
        {
            const optionLocator = dropdownList.getByRole('option', { name: option }).first();
            await expect(optionLocator).toBeVisible();
            await optionLocator.click();
        }
        await this.page.keyboard.press('Escape');
        await expect(this.errorMessageLocator).toBeHidden();
    }

    /**
     * Interacts with complex form rows containing multiple dropdowns under a single label
     * Targets a specific dropdown within the row using a zero-based index
     * @param label - The exact text of the row label (e.g., 'Wallet from / to')
     * @param index - The zero-based index of the target dropdown (e.g., 0 for the first, 1 for the second)
     * @param option - The text of the option to select
     * @returns A promise that resolves when the selection is complete
     */
    public async selectMultiDropDown(label: string, index: number, option?: string): Promise<void> 
    {
        await this.page.waitForLoadState('networkidle');
        const elementLable = this.labelElement.filter({ has: this.page.getByText(label, { exact: true }) }).first();
        const dropdownInput = elementLable.locator('..').locator('.Input.dropdown-input').nth(index);
        await expect(dropdownInput).toBeVisible();

        await this.clearDropdownValues(dropdownInput);

        await dropdownInput.click();
        
        const dropdownList = dropdownInput.getByRole('listbox').first();
        await expect(dropdownList).toBeVisible();

        const noneButton = dropdownList.getByRole('button', { name: 'None', exact: true });
        if (await noneButton.count() > 0 && await noneButton.isVisible()) 
        {
            await noneButton.click();
            await this.page.waitForTimeout(200); 
        }
        
        if (option === undefined) 
        {
            const firstOption = this.page.getByRole('option', { exact: true }).first();
            await expect(firstOption).toBeVisible();
            await firstOption.click();
        } 
        else 
        {
            const optionLocator = dropdownList.getByRole('option', { name: option }).first();
            await expect(optionLocator).toBeVisible();
            await optionLocator.click();
        }
        
        await this.page.keyboard.press('Escape');
        await expect(this.errorMessageLocator).toBeHidden();
    }

    /**
     * Fills a date input field while ensuring the previous value is cleared
     * Uses platform-specific keyboard shortcuts (Cmd+A or Ctrl+A) to select and overwrite existing text
     * @param label - The exact text of the date field label
     * @param date - The date string to be entered
     * @returns A promise that resolves when the date is entered and the input focus is cleared
     */
    public async fillDateInput(label: string, date: string): Promise<void> 
    {
        await this.page.waitForLoadState('networkidle');
        const fieldContainer = this.textInputLocator.filter({ has: this.page.getByText(label, { exact: true }) }).first();
        await expect(fieldContainer).toBeVisible();
        const input = fieldContainer.locator('input.form-control').first();
        await expect(input).toBeVisible();
        const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
        await this.page.keyboard.press(`${modifier}+A`);
        await input.fill(date);
        await this.page.keyboard.press(`Tab`);
        await this.page.keyboard.press(`Escape`);
        await expect(this.errorMessageLocator).toBeHidden();
    }

    /**
     * Sets the state of a checkbox or toggle identified by its label
     * Only performs a click if the current state differs from the desired state
     * @param label - The visible text label of the checkbox
     * @param state - The target boolean state (true for checked, false for unchecked)
     * @returns A promise that resolves when the checkbox reaches the target state
     */
    public async setCheckbox(labelText: string, state: boolean): Promise<void> 
    {
        await this.page.waitForLoadState('networkidle');
        const wrapper = this.checkBoxLocator.filter({ hasText: new RegExp(`^${labelText}$`) }).first();
        await expect(wrapper).toBeVisible();

        await this.page.waitForTimeout(500);

        const classAttribute = await wrapper.getAttribute('class') || '';
        const isCurrentlyChecked = classAttribute.includes('checked');

        if (isCurrentlyChecked !== state) 
        {
            const labelElement = wrapper.locator('label');
            await labelElement.click({ force: true, delay: 100 });
        }

        if (state) 
        {
            await expect(wrapper).toHaveClass(/checked/);
        } 
        else 
        {
            await expect(wrapper).not.toHaveClass(/checked/);
        }
    }

    /**
     * Verifies if an input field, dropdown, or checkbox is in a disabled (read-only) state
     * Checks for specific CSS classes on containers or the 'disabled' attribute on HTML elements
     * @param label - The exact text of the field label to check
     * @throws {Error} If no element with the provided label is found on the page
     * @returns A promise that resolves when the disabled state assertion passes
     */
    public async checkIsDisabled(label: string): Promise<void> 
    {
        await this.page.waitForLoadState('networkidle');
        const textLocator = this.textInputLocator.filter({ has: this.page.getByText(label, { exact: true }) }).last();
        
        const dropLocator = this.dropdownLocator.filter({ has: this.page.getByText(label, { exact: true }) }).first();
        
        const checkboxLocator = this.page.getByLabel(label);

        if (await textLocator.isVisible()) 
        {
            await expect(textLocator).toHaveClass(/is-disabled/);
        } 
        else if (await dropLocator.isVisible()) 
        {
            await expect(dropLocator).toHaveClass(/is-disabled/);
        }
        else if (await checkboxLocator.count() > 0) 
        {
            await expect(checkboxLocator).toBeDisabled();
        }
        else 
        {
            throw new Error(`Field with label "${label}" not found to check for disabled state.`);
        }
    }

    /**
     * Submits the form by clicking the save button.
     * Can optionally target a specific save button by its exact text.
     * @param buttonName - Optional exact text of the button to click (e.g., 'Create', 'Save & Next')
     */
    public async save(buttonName?: string): Promise<void> 
    {
        await expect(this.errorMessageLocator).toBeHidden();
        
        const targetButton = buttonName 
            ? this.saveButton.getByText(buttonName, { exact: true }) 
            : this.saveButton.first();
            
        await expect(targetButton).toBeVisible();
        await targetButton.click();
        
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Cancels the form interaction by clicking the cancel button.
     * Can optionally target a specific cancel button by its exact text.
     * @param buttonName - Optional exact text of the button to click
     */
    public async cancel(buttonName?: string): Promise<void>
    {
        const targetButton = buttonName 
            ? this.cancelButton.getByText(buttonName, { exact: true }) 
            : this.cancelButton.first();

        await expect(targetButton).toBeVisible();
        await targetButton.click();
        
        await this.page.waitForLoadState('networkidle');

    }
}