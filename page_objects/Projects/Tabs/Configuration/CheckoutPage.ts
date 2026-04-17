import { Page} from '@playwright/test';
import { PaymentMethodsPage } from './Checkout/PaymentMethodsPage';  
import { CheckoutConfigurationPage } from './Checkout/CheckoutConfigurationPage';
import { CheckoutSettingsPage } from './Checkout/CheckoutSettingsPage';

export class CheckoutPage 
{
    public readonly paymentMethodsPage: PaymentMethodsPage
    public readonly checkoutConfigurationPage: CheckoutConfigurationPage
    public readonly checkoutSettingsPage: CheckoutSettingsPage

    constructor(page: Page) 
    {
        this.paymentMethodsPage = new PaymentMethodsPage(page)
        this.checkoutConfigurationPage = new CheckoutConfigurationPage(page)
        this.checkoutSettingsPage = new CheckoutSettingsPage(page)
    }
}