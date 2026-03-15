import { Locator, Page, FrameLocator, expect } from '@playwright/test';

/**
 * Represents a specialized widget for secure credit card data entry
 * This component handles sensitive fields (Card Number, Expiry, CVC) that are typically hosted within 
 * cross-origin iframes for security and compliance purposes
 * Provides high-level methods to populate these fields while managing iframe switching and dropdown interactions
 */
export class CreditCardWidget 
{
    /** The Playwright Page instance */
    private readonly page: Page;
    
    /** Locator for the main text input containers of the widget */
    private readonly textInputLocator: Locator;
    
    /** Locator for the specific container holding the expiry date and CVV inputs */
    private readonly ExpiryCvvContainer: Locator;
    
    /** Locator for the dropdown used to select between saved cards and a new card entry */
    private readonly selectCardDropDown: Locator;
    
    /** Locator for the "New Card" option within the card selection dropdown */
    private readonly newCardOption: Locator;

    /** Static label for the card number field group */
    public static readonly cardNumber: string = 'Card Number';
    
    /** Static label for the combined expiry and CVC field group */
    public static readonly ExpireAndCVC: string = 'Expire date / CVC';
    
    /**
     * Initializes a new instance of the CreditCardWidget class
     * Sets up locators for input containers and dropdown elements
     * @param page - The Playwright Page instance
     */
    constructor(page: Page) 
    {
        this.page = page;
        this.textInputLocator = page.locator('.ui.input.Input')
        this.ExpiryCvvContainer = page.locator('.expiry-cvv-inputs-container');
        this.selectCardDropDown = page.locator('.PW-dropdown-icon__container').first();
        this.newCardOption = page.locator('.PW-dropdown-option.new-card-option');
    }

    /**
     * Private helper to resolve a FrameLocator for a secure input field hosted within an iframe
     * Dynamically identifies the iframe by filtering its parent container by text label and extracting the 'src' attribute
     * @param containerSelector - The Locator representing the group of potential iframe containers
     * @param label - The text label used to identify the specific field container (e.g., 'Card Number')
     * @param indexOfIframe - The zero-based index of the iframe within the identified container
     * @throws {Error} If the iframe element or its 'src' attribute cannot be located
     * @returns A promise that resolves to a FrameLocator for the targeted secure input
     */
    private async getIframe(containerSelector: Locator, label: string, indexOfIframe: number = 0): Promise<FrameLocator>
    {
        const container = containerSelector.filter({ hasText: label }).first();
        await expect(container).toBeVisible();

        const iframeElement = container.locator('iframe').nth(indexOfIframe);
        await expect(iframeElement).toBeVisible();

        const frameSrc = await iframeElement.getAttribute('src');

        if (frameSrc) 
        {
            return this.page.frameLocator(`iframe[src="${frameSrc}"]`);
        }
        
        throw new Error(`Cannot find iframe in ${containerSelector} with label "${label}"`);
    }

    /**
     * Populates the card number field
     * If a card selection dropdown is present, it automatically triggers the "New Card" option 
     * before attempting to fill the secure iframe input
     * @param cardNumbeToInput - The full credit card number string to enter
     * @returns A promise that resolves when the card number is successfully typed into the iframe
     */
    public async fillCardNumber(cardNumbeToInput: string)
    {
        await expect(this.selectCardDropDown).toBeVisible()
        if (await this.selectCardDropDown.isVisible())
        {
            await this.selectCardDropDown.click();
            await expect(this.newCardOption).toBeVisible();
            await this.newCardOption.click();
        }
        const frame = await this.getIframe(this.textInputLocator, CreditCardWidget.cardNumber); 
        const inputForCardNumber = frame.locator('input[name = "cardInput"]').first();
        await expect(inputForCardNumber).toBeVisible()
        await expect(inputForCardNumber).toBeEnabled({ timeout: 1000 })
        await inputForCardNumber.fill(cardNumbeToInput);
    }

    /**
     * Populates the expiration date field (MM/YY or MM/YYYY format)
     * Automatically clears existing values before entering the new date if the field is not empty
     * @param date - The expiration date string or undefined to skip the action
     * @returns A promise that resolves when the expiration date is entered into the secure iframe
     */
    public async fillExpireDate(date: string | undefined)
    {
        const frame = await this.getIframe(this.ExpiryCvvContainer, CreditCardWidget.ExpireAndCVC, 0);
        const inputForExpireDate = frame.locator('input[name = "expiryInput"]').first();
        await expect(inputForExpireDate).toBeVisible()
        await expect(inputForExpireDate).toBeEnabled({ timeout: 1000 })
        if (await inputForExpireDate.inputValue() !== '')
        {
            await inputForExpireDate.fill('');
        }
        if (date !== undefined)
        {
            await inputForExpireDate.fill(date);
        }
    }

    /**
     * Populates the CVC/CVV security code field
     * Targets the second iframe (index 1) within the Expiry/CVC container
     * @param cvc - The security code string or undefined to skip the action
     * @returns A promise that resolves when the CVC is entered into the secure iframe
     */
    public async fillCVC(cvc: string| undefined)
    {
        const frame = await this.getIframe(this.ExpiryCvvContainer, CreditCardWidget.ExpireAndCVC, 1);
        const inputForCVC = frame.locator('input[name = "cvcInput"]').first();
        await expect(inputForCVC).toBeVisible()
        await expect(inputForCVC).toBeEnabled({ timeout: 1000 })
        if (cvc !== undefined)
        {
            await inputForCVC.fill(cvc);
        }
    }
}