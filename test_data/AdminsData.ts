export type CreateAdminData = 
{
    email: string;    
    password: string;      
    role: string;        
}
export type EditAdminData = 
{
    status: 'Active' | 'Blocked';
    role: string;
    first_name: string;
    last_name: string;
    phone: string;
}

export const adminDataForCreation: CreateAdminData =
{
    email: 'v.ratushniak+adminforautotest@qtech.software',
    password: 'Password12345',
    role: 'Super Admin'
}