import { ValidPermissions } from "./Permissions";

export type RoleData = 
{
    name: string;          
    description: string;          
    permissions: ValidPermissions[]; 
}