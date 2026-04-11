import {test as base } from '@playwright/test'
import { LoginPage} from '../page_objects/LoginPage'
import { DashboardPage } from '../page_objects/Dashboard/DashboardPage'
import { BillingPage } from '../page_objects/Billing/BillingPage'
import { OrdersPage } from '../page_objects/Orders/OrdersPage'
import { ReportsPage } from '../page_objects/Reports/ReportsPage'
import { TransactionAddPage } from '../page_objects/Transactions/TransactionAddPage'
import { MIDsPage } from '../page_objects/MIDs/MIDsPage'
import { NewAggregatedMidPage } from '../page_objects/MIDs/AggregatedMIDs/NewAggregatedMidPage'
import { NewSecureDepositPage } from '../page_objects/MIDs/SecureDeposits/NewSecureDepositPage'
import { NewInternalMidPage } from '../page_objects/MIDs/InternalMIDs/NewInternalMidPage'
import { TransactionsMainPage } from '../page_objects/Transactions/TransactionsMainPage'
import { NewExternalMidPage } from '../page_objects/MIDs/ExternalMIDs/NewExternalMidPage'
import { EmoneyPage } from '../page_objects/E-money/EmoneyPage'
import { NewOperationalWalletPage } from '../page_objects/E-money/Wallets/Operational/NewOperationalWalletPage'
import { NewMerchantWalletPage } from '../page_objects/E-money/Wallets/Merchant/NewMerchantWalletPage'
import {LedgerAddOperationPage} from '../page_objects/E-money/Ledger/LedgerAddOperationPage'
import {AddLimitPage} from '../page_objects/E-money/Settings/AddLimitPage'
import { CustomerWalletDetailsPage } from '../page_objects/E-money/Wallets/Customer/CustomerWalletDetailsPage'
import {MerchantWalletDetailsPage} from '../page_objects/E-money/Wallets/Merchant/MerchantWalletDetailsPage'
import { LimitDetailsPage } from '../page_objects/E-money/Settings/LimitDetailsPage'
import { OperationalWalletDetailsPage } from '../page_objects/E-money/Wallets/Operational/OperationalWalletDetailsPage'
import { EditLimitPage } from '../page_objects/E-money/Settings/EditLimitPage'
import { EditFeeObjectPage } from '../page_objects/E-money/Wallets/Operational/EditFeeObjectPage'
import { EditMerchantWalletPage } from '../page_objects/E-money/Wallets/Merchant/EditMerchantWalletPage'
import {RoleDetailsPage} from '../page_objects/Settings/Users/Roles/RoleDetailsPage'
import {EditRolePage} from '../page_objects/Settings/Users/Roles/EditRolePage'
import {NewRolePage} from '../page_objects/Settings/Users/Roles/NewRolePage'

type Fixtures = 
{
    loginPage: LoginPage
    dashboardPage: DashboardPage
    billingPage: BillingPage
    ordersPage: OrdersPage
    transactionsMainPage: TransactionsMainPage;
    transactionAddPage: TransactionAddPage;
    reportsPage: ReportsPage;
    MIDsPage: MIDsPage;
    newSecureDepositPage: NewSecureDepositPage;
    newAggregatedMidPage: NewAggregatedMidPage;
    newInternalMidPage: NewInternalMidPage;
    newExternalMidPage: NewExternalMidPage;
    emoneyPage: EmoneyPage;
    newOperationalWalletPage: NewOperationalWalletPage
    newMerchantWalletPage: NewMerchantWalletPage
    ledgerAddOperationPage: LedgerAddOperationPage
    addLimitPage: AddLimitPage
    customerWalletDetailsPage: CustomerWalletDetailsPage
    merchantWalletDetailsPage: MerchantWalletDetailsPage
    limitDetailsPage: LimitDetailsPage
    operationalWalletDetailsPage: OperationalWalletDetailsPage
    editLimitPage: EditLimitPage
    editFeeObjectPage: EditFeeObjectPage
    editMerchantWalletPage: EditMerchantWalletPage
    roleDetailsPage: RoleDetailsPage
    editRolePage: EditRolePage
    newRolePage: NewRolePage
}

export const pomTest = base.extend<Fixtures>(
{
    loginPage: async ({page}, use) =>
    {
        await use(new LoginPage(page))
    },

    dashboardPage: async({page}, use) =>
    {
        await use(new DashboardPage(page))
    },
    
    billingPage: async ({page}, use) =>
    {
        await use (new BillingPage(page))
    },
    
    ordersPage: async ({page}, use) =>
    {
        await use (new OrdersPage(page))
    },
    
    transactionsMainPage: async ({page}, use) =>
    {
        await use (new TransactionsMainPage(page))
    },
    
    reportsPage: async ({page}, use) =>
    {
        await use (new ReportsPage(page))
    },

    transactionAddPage: async ({page}, use) =>
    {
        await use (new TransactionAddPage(page))
    },

    MIDsPage: async ({page}, use) =>
    {
        await use (new MIDsPage(page))
    },
    
    newSecureDepositPage: async ({page}, use) =>
    {
        await use (new NewSecureDepositPage(page))
    },

    newAggregatedMidPage : async ({page}, use) =>
    {
        await use (new NewAggregatedMidPage(page))
    },

    newInternalMidPage : async ({page}, use) =>
    {
        await use (new NewInternalMidPage(page))
    },

    newExternalMidPage : async ({page}, use) =>
    {
        await use (new NewExternalMidPage(page))
    },

    emoneyPage: async ({page}, use) =>
    {
        await use(new EmoneyPage(page));
    },

    newOperationalWalletPage: async ({page}, use) =>
    {
        await use(new NewOperationalWalletPage(page));
    },

    newMerchantWalletPage: async ({page}, use) =>
    {
        await use(new NewMerchantWalletPage(page));
    },

    ledgerAddOperationPage: async ({page}, use) =>
    {
        await use(new LedgerAddOperationPage(page));
    },

    addLimitPage: async ({page}, use) =>
    {
        await use(new AddLimitPage(page));
    },

    customerWalletDetailsPage: async ({page}, use) =>
    {
        await use(new CustomerWalletDetailsPage(page));
    },

    merchantWalletDetailsPage : async ({page}, use) =>
    {
        await use(new MerchantWalletDetailsPage(page));
    },

    editMerchantWalletPage: async ({page}, use) =>
    {
        await use(new EditMerchantWalletPage(page));
    },

    limitDetailsPage: async ({page}, use) =>
    {
        await use(new LimitDetailsPage(page));
    },
    
    operationalWalletDetailsPage: async ({page}, use) =>
    {
        await use(new OperationalWalletDetailsPage(page));
    },

    editLimitPage: async ({page}, use) =>
    {
        await use(new EditLimitPage(page));
    },
    editFeeObjectPage: async ({page}, use) =>
    {
        await use(new EditFeeObjectPage(page));
    },
    roleDetailsPage: async ({page}, use) =>
    {
        await use(new RoleDetailsPage(page));
    },
    editRolePage: async ({page}, use) =>
    {
        await use(new EditRolePage(page));
    },
    newRolePage: async ({page}, use) =>
    {
        await use(new NewRolePage(page));
    }
})

export {expect} from "@playwright/test"
