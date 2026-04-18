import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { CreationForm } from '../related_components/CreationForm';
import { CreditCardWidget } from '../related_components/CreditCardWidget';

export class TransactionAddPage extends BasePage 
{
    /** The Shared form component used to handle standard text inputs and dropdowns */
    public readonly form: CreationForm;
    
    /** Locator for the loading indicator to ensure the page is fully ready before interaction */
    private readonly pageLoaded: Locator;
    
    /** The widget component specifically designed to handle secure credit card data entry */
    public readonly card: CreditCardWidget;

    /**
     * Initializes a new instance of the TransactionAddPage class
     * Sets the base URL to the transaction creation route and prepares all sub-components
     * @param page - The Playwright Page instance used to interact with the browser
     */
    constructor(page: Page) 
    {
        super(page, /\/transactions\/add/)
        this.form = new CreationForm(page);
        this.card = new CreditCardWidget(page);
        this.pageLoaded = page.locator('.ui.inverted.text.loader').first();
    }

    /**
     * Executes the creation of a new transaction by populating the form with the provided data
     * Dynamically adjusts the filled fields based on whether the transaction type is a Payment or a Payout
     * Fills in optional customer details if they are provided in the data object and then saves the form
     * @param data - The configuration object containing all necessary transaction details
     * @param data.amount - The monetary value of the transaction
     * @param data.currency - The currency code for the transaction (e.g., USD, EUR)
     * @param data.transaction_type - The specific type of transaction (Payment or Payout)
     * @param data.card_number - The primary account number for the credit card
     * @param data.card_expiry - The expiration date of the card (required for Payments)
     * @param data.card_cvc - The security code of the card (required for Payments)
     * @param data.description - Additional notes or reason for the transaction
     * @param data.cardholder_Name - The full name printed on the credit card
     * @param data.Email - The customer's contact email address
     * @param data.Phone - The customer's contact phone number
     * @returns A promise that resolves when the data is entered and the save action is triggered
     */
    public async createTransaction
    (data: 
    { 
        amount: string, 
        currency: string, 
        transaction_type: string, 
        card_number: string, 
        card_expiry?: string | undefined,
        card_cvc?: string | undefined, 
        description?: string, 
        cardholder_Name?: string, 
        Email?: string, 
        Phone?: string 
    }):
    Promise<void>
    {
        await expect(this.pageLoaded).toBeHidden();
        await this.form.selectDropDown('Payment type', data.transaction_type);
        if (data.transaction_type === 'Payment')
        {
            await this.form.selectDropDown('Currency', data.currency);
            await this.form.fillInputField('Amount', data.amount);
            await this.card.fillCardNumber(data.card_number);
            await this.card.fillExpireDate(data.card_expiry);
            await this.card.fillCVC(data.card_cvc);
        }
        else if (data.transaction_type === 'Payout')
        {
            await this.form.selectDropDown('Currency', data.currency);
            await this.form.fillInputField('Amount', data.amount);
            await this.card.fillCardNumber(data.card_number);

        }
        if (data.description) 
        {
            await this.form.fillInputField('Description', data.description);
        }
        if (data.cardholder_Name) 
        {
            await this.form.fillInputField('Cardholder Name', data.cardholder_Name);
        }
        if (data.Email) 
        {
            await this.form.fillInputField('Email', data.Email);
        }
        if (data.Phone) 
        {
            await this.form.fillInputField('Phone', data.Phone);
        }
        await this.form.save();
    }
}