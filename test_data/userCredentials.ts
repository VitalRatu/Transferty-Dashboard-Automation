export const userData: { EMAIL: string; PASSWORD: string } = 
{
    EMAIL: process.env.EMAIL!,
    PASSWORD: process.env.PASSWORD!,
};

export const adminData: { ADMIN_EMAIL: string; ADMIN_PASSWORD: string } = 
{
    ADMIN_EMAIL: process.env.ADMIN_EMAIL!,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD!,
};
