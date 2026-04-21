import { TransfertyPermissions } from "../page_objects/related_components/PermissionsTable";

export type RoleData = 
{
    name: string;          
    description: string;          
    permissions: TransfertyPermissions[]; 
}