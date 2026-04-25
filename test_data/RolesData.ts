import { TransfertyPermissions } from "../page_objects/related_components/PermissionsTable";

export type RoleType = 
{
    name: string;          
    description: string;          
    permissions: TransfertyPermissions[]; 
}