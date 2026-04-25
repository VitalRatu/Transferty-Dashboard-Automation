import { Page,  } from '@playwright/test';
import { BasePage } from '../../../../BasePage';
import { DetailsPageReader } from '../../../../related_components/DetailsPageReader';
import { ProjectDetailsType } from '../../../../../types/ProjectDetails';
import { CreationForm } from '../../../../related_components/CreationForm';

type FieldConfig = { label: string; type: 'text' | 'dropdown' | 'date' };

export class EditProjectPage extends BasePage 
{
    public readonly view: DetailsPageReader;

    public readonly creationForm: CreationForm


    private readonly fieldMapping: Partial<Record<keyof ProjectDetailsType, FieldConfig>> = 
    {
        project_name:              { label: 'Project name', type: 'text' },
        website:                   { label: 'Website', type: 'text' },
        description:               { label: 'Description', type: 'text' },
        merchant_name:             { label: 'Merchant name', type: 'text' },
        merchant_country:          { label: 'Merchant country', type: 'text' },
        refund_policy_url:         { label: 'Refund policy URL', type: 'text' },
        terms_and_conditions:      { label: 'Terms & Conditions URL', type: 'text' },
        privacy_policy:            { label: 'Privacy policy URL', type: 'text' },
        customer_email:            { label: 'Customer service email', type: 'text' },
        
        em_scheme:                 { label: 'EM scheme', type: 'dropdown' },
        emoney_operator_desc:      { label: 'E-money Operator description', type: 'text' },
        payment_organization_desc: { label: 'Payment organization description', type: 'text' }
    };
    constructor(page: Page) 
    {
        super(page, /\/projects\/\d+\/edit\/?$/);
        this.view = new DetailsPageReader(page);
        this.creationForm = new CreationForm(page)
    }

    public async editProjectDetails(data: Partial<ProjectDetailsType>): Promise<boolean> 
    {
        // key becomes "project_name"
        // config becomes "{ label: 'Project name', type: 'text' }"
        for (const [key, config] of Object.entries(this.fieldMapping)) 
        {
            const fieldKey = key as keyof ProjectDetailsType;
            const value = data[fieldKey];

            if (value !== undefined) 
            {
                let isSuccess: boolean = true;

                switch (config.type) 
                {
                    case 'text':
                        isSuccess = await this.creationForm.fillInputField(config.label, value as string);
                        break;
                    case 'dropdown':
                        isSuccess = await this.creationForm.selectDropDown(config.label, value as string);
                        break;
                    case 'date':
                        isSuccess = await this.creationForm.fillDateInput(config.label, value as string);
                        break;
                }

                if (!isSuccess) 
                {
                    return false;
                }
            }
        }

        return await this.creationForm.save(); 
    }
}