import { Page } from '@playwright/test';
import { BasePage } from '../../../../BasePage';
import { CreationForm } from '../../../../related_components/CreationForm';

export type CheckoutSettingsType =
{
    allow_cascading: 'Yes' | 'No';
    redirect_to_after_3DS: 'Transferty® Checkout status page' | "Merchant's website";
    autoredirect: 'On' | 'Off'
    autoredirect_after: string
    checkout_expires: string
}


export class CheckoutSettingsPage extends BasePage 
{

    public readonly form: CreationForm

    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/configurations\/checkout\/settings\/?$/); 

        this.form = new CreationForm(page)
    }

    public async changeCheckoutSettings(data: Partial<CheckoutSettingsType>): Promise<boolean>
    {
        if (data.allow_cascading) 
        {
            await this.form.selectDropDown('Allow transaction cascading after 3DS', data.allow_cascading);
        }
        
        if (data.redirect_to_after_3DS) 
        {
            await this.form.selectDropDown('Redirect to page after 3Ds', data.redirect_to_after_3DS);
        }
        
        if (data.autoredirect) 
        {
            await this.form.selectDropDown('Autoredirect', data.autoredirect);
        }

        if (data.autoredirect_after) 
        {
            await this.form.fillInputField('Autoredirect after (seconds)', data.autoredirect_after);
        }
        
        if (data.checkout_expires) 
        {
            await this.form.fillInputField('Checkout URL expires in (minutes)', data.checkout_expires);
        }

        return await this.form.save();
    }
}