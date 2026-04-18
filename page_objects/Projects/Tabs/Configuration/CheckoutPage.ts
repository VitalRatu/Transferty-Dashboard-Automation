import { Page} from '@playwright/test';
import { PaymentMethodsPage } from './Checkout/PaymentMethodsPage';  
import { CheckoutConfigurationPage } from './Checkout/CheckoutConfigurationPage';
import { CheckoutSettingsPage } from './Checkout/CheckoutSettingsPage';
import { Orchestrator } from '../../../Orchestrator';

export type CheckoutTabName = 
    | 'Payment methods' 
    | 'Configuration' 
    | 'Settings' 

export class CheckoutPage extends Orchestrator<CheckoutTabName>
{
    public readonly paymentMethodsPage: PaymentMethodsPage
    public readonly checkoutConfigurationPage: CheckoutConfigurationPage
    public readonly checkoutSettingsPage: CheckoutSettingsPage

    constructor(page: Page, tabDepth = 0) 
    {
        super(page, tabDepth )
        this.paymentMethodsPage = new PaymentMethodsPage(page)
        this.checkoutConfigurationPage = new CheckoutConfigurationPage(page)
        this.checkoutSettingsPage = new CheckoutSettingsPage(page)
    }
}