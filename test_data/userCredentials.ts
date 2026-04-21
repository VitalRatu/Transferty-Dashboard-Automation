export const merchantData: { MERCHANT_EMAIL: string, MERCHANT_PASSWORD: string } = 
{
    MERCHANT_EMAIL: process.env.MERCHANT_EMAIL!,
    MERCHANT_PASSWORD: process.env.MERCHANT_PASSWORD!,
};

export const adminData: { ADMIN_EMAIL: string, ADMIN_PASSWORD: string } = 
{
    ADMIN_EMAIL: process.env.ADMIN_EMAIL!,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
};

export const adminForPermissionsData: {ADMIN_FOR_PERMISSIONS: string, ADMIN_FOR_PERMISSIONS_PASSWORD: string } = 
{
    ADMIN_FOR_PERMISSIONS: process.env.ADMIN_FOR_PERMISSIONS!,
    ADMIN_FOR_PERMISSIONS_PASSWORD: process.env.ADMIN_FOR_PERMISSIONS_PASSWORD!
}
