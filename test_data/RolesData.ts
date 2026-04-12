import { ValidPermission } from "./Permissions";

export type RoleData = 
{
    name: string;          
    description: string;          
    permissions: ValidPermission[]; 
}