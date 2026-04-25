import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../../BasePage';
import { CreationForm } from '../../related_components/CreationForm';
import { ExternalMidType } from '../../../types/MIDs';
import { CustomerFee } from './CustomerFee';

type FieldConfig = { label: string; type: 'text' | 'dropdown' };

export class NewExternalMidPage extends BasePage
{
    public readonly form: CreationForm;
    private readonly pageLoaded: Locator;
    private readonly customerFee: CustomerFee;

    private readonly fieldMapping: Partial<Record<keyof ExternalMidType, FieldConfig>> =
    {
        project:                        { label: 'Project',                            type: 'dropdown' },
        account_management_api_support: { label: 'Account management API support',     type: 'dropdown' },
        provider:                       { label: 'Provider',                           type: 'dropdown' },
        intermediary:                   { label: 'Intermediary',                       type: 'dropdown' },
        psp:                            { label: 'PSP',                                type: 'dropdown' },
        externalMid:                    { label: 'External MID',                       type: 'text'     },
        providersMid:                   { label: "Provider's MID",                     type: 'text'     },
        api_endpoint:                   { label: 'API endpoint',                       type: 'text'     },
        description:                    { label: 'Description',                        type: 'text'     },
        timezone:                       { label: 'Timezone',                           type: 'dropdown' },
        balance_api_support:            { label: 'Balance API support',                type: 'dropdown' },
        static_result_url:              { label: 'Static result URL',                  type: 'text'     },
        customer_data_randomization:    { label: 'Enable customer data randomization', type: 'dropdown' },
    };

    constructor(page: Page)
    {
        super(page, /\/mids\/external\/add\/?$/)
        this.form = new CreationForm(page);
        this.pageLoaded = page.locator('.ui.inverted.text.loader').first();
        this.customerFee = new CustomerFee(page)
    }

    public async createExternalMID(data: ExternalMidType): Promise<boolean>
    {
        await expect(this.pageLoaded).toBeHidden();

        const normalizedData = { account_management_api_support: 'No' as const, ...data };

        for (const [key, config] of Object.entries(this.fieldMapping))
        {
            const fieldKey = key as keyof ExternalMidType;
            const value = normalizedData[fieldKey];

            if (value !== undefined)
            {
                let isSuccess: boolean = true;

                switch (config.type)
                {
                    case 'text':
                        isSuccess = await this.form.fillInputField(config.label, value as string);
                        break;
                    case 'dropdown':
                        isSuccess = await this.form.selectDropDown(config.label, value as string);
                        break;
                }

                if (!isSuccess)
                {
                    return false;
                }
            }
        }

        if (data.providers_credential) 
        {
            for (const [labelName, credentialValue] of Object.entries(data.providers_credential)) 
            {
                const isSuccess = await this.form.fillInputField(labelName, credentialValue as string);
                if (!isSuccess) return false;
            }
        }

        if (data.customerFees && data.customerFees.length > 0) 
        {
            for (const fee of data.customerFees) 
            {
                const isFeeConfigured = await this.customerFee.fillFeeData(fee);
                
                if (!isFeeConfigured) 
                {
                    return false;
                }
            }
        }

        return await this.form.save();
    }
}
