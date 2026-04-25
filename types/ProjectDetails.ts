type BaseProjectDetails = 
{
    project_name: string;
    website: string;
    description: string;
    merchant_name: string;
    merchant_country: string;
    refund_policy_url: string;
    terms_and_conditions: string;
    privacy_policy: string;
    customer_email: string;
};


type EMSchemeEnabled = 
{
    em_scheme: 'Yes';
    emoney_operator_desc: string;
    payment_organization_desc: string;
};

type EMSchemeDisabled = 
{
    em_scheme: 'No';

    emoney_operator_desc?: never; 
    payment_organization_desc?: never;
};

export type ProjectDetailsType = BaseProjectDetails & (EMSchemeEnabled | EMSchemeDisabled);