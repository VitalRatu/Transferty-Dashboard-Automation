import { Page                         } from '@playwright/test'                                                          ;
import { LoginPage                    } from '../page_objects/LoginPage'
import { DashboardPage                } from '../page_objects/Dashboard/DashboardPage'                                   ;
import { BillingPage                  } from '../page_objects/Billing/BillingPage'                                       ;
import { OrdersListPage               } from '../page_objects/Orders/OrdersListPage'                                     ;
import { ReportsPage                  } from '../page_objects/Reports/ReportsPage'                                       ;
import { TransactionAddPage           } from '../page_objects/Transactions/TransactionAddPage'                           ;
import { MIDsPage                     } from '../page_objects/MIDs/MIDsPage'                                             ;
import { NewAggregatedMidPage         } from '../page_objects/MIDs/AggregatedMIDs/NewAggregatedMidPage'                  ;
import { NewSecureDepositPage         } from '../page_objects/MIDs/SecureDeposits/NewSecureDepositPage'                  ;
import { NewInternalMidPage           } from '../page_objects/MIDs/InternalMIDs/NewInternalMidPage'                      ;
import { TransactionsPage             } from '../page_objects/Transactions/TransactionsPage'                             ;
import { NewExternalMidPage           } from '../page_objects/MIDs/ExternalMIDs/NewExternalMidPage'                      ;
import { EmoneyPage                   } from '../page_objects/E-money/EmoneyPage'                                        ;
import { NewOperationalWalletPage     } from '../page_objects/E-money/Wallets/Operational/NewOperationalWalletPage'      ;
import { NewMerchantWalletPage        } from '../page_objects/E-money/Wallets/Merchant/NewMerchantWalletPage'            ;
import { LedgerAddOperationPage       } from '../page_objects/E-money/Ledger/LedgerAddOperationPage'                     ;
import { AddLimitPage                 } from '../page_objects/E-money/Settings/AddLimitPage'                             ;
import { CustomerWalletDetailsPage    } from '../page_objects/E-money/Wallets/Customer/CustomerWalletDetailsPage'        ;
import { MerchantWalletDetailsPage    } from '../page_objects/E-money/Wallets/Merchant/MerchantWalletDetailsPage'        ;
import { LimitDetailsPage             } from '../page_objects/E-money/Settings/LimitDetailsPage'                         ;
import { OperationalWalletDetailsPage } from '../page_objects/E-money/Wallets/Operational/OperationalWalletDetailsPage' ;
import { EditLimitPage                } from '../page_objects/E-money/Settings/EditLimitPage'                            ;
import { EditFeeObjectPage            } from '../page_objects/E-money/Wallets/Operational/EditFeeObjectPage'             ;
import { EditMerchantWalletPage       } from '../page_objects/E-money/Wallets/Merchant/EditMerchantWalletPage'           ;
import { RoleDetailsPage              } from '../page_objects/Settings/Users/Roles/RoleDetailsPage'                      ;
import { EditRolePage                 } from '../page_objects/Settings/Users/Roles/EditRolePage'                         ;
import { NewRolePage                  } from '../page_objects/Settings/Users/Roles/NewRolePage'                          ;
import { InternalMidsListPage         } from '../page_objects/MIDs/InternalMIDs/InternalMidsListPage'                    ;
import { UsersPage                    } from '../page_objects/Settings/UsersPage'                                        ;
import { AdminDetailsPage             } from '../page_objects/Settings/Users/Admins/AdminDetailsPage'                    ;
import { NewAdminPage                 } from '../page_objects//Settings/Users/Admins/NewAdminPage'                       ;
import { AggregatedMidDetailsPage     } from '../page_objects/MIDs/AggregatedMIDs/AggregatedMidDetailsPage'              ;
import { ProjectsListPage             } from '../page_objects/Projects/ProjectsListPage'                                 ;
import { ProjectPage                  } from '../page_objects/Projects/ProjectPage'                                      ;
import { MonitoringPage               } from '../page_objects/Monitoring/MonitoringPage'                                 ;
import { SubscriptionsPage            } from '../page_objects/Subscriptions/SubscriptionsPage'                           ;
import { LedgerPage                   } from '../page_objects/E-money/Ledger/LedgerPage'                                ;
import { CheckoutSettingsPage         } from '../page_objects/Projects/Tabs/Configuration/Checkout/CheckoutSettingsPage';
import { EditProjectPage } from '../page_objects/Projects/Tabs/Configuration/Project/EditProjectPage';
import { FxSpreadDetailsPage } from '../page_objects/Projects/Tabs/Configuration/FxSpread/FxSpreadDetailsPage';
import { FxSpreadListPage } from '../page_objects/Projects/Tabs/Configuration/FxSpread/FxSpreadListPage';
import { ExternalMidDetailsPage } from '../page_objects/MIDs/ExternalMIDs/ExternalMidDetailsPage';



export class PageManager 
{
    private readonly page: Page;

    constructor(page: Page) 
    {
        this.page = page;
    }

    get loginPage(): LoginPage { return new LoginPage(this.page); }
    get dashboardPage(): DashboardPage { return new DashboardPage(this.page); }

    get projectsListPage(): ProjectsListPage { return new ProjectsListPage(this.page); }
    get projectPage(): ProjectPage { return new ProjectPage(this.page); }
    get billingPage(): BillingPage { return new BillingPage(this.page); }
    get ordersListPage(): OrdersListPage { return new OrdersListPage(this.page); }
    get reportsPage(): ReportsPage { return new ReportsPage(this.page); }
    get monitoringPage(): MonitoringPage { return new MonitoringPage(this.page); }
    get subscriptionsPage(): SubscriptionsPage { return new SubscriptionsPage(this.page); }

    get transactionsPage(): TransactionsPage { return new TransactionsPage(this.page); }
    get transactionAddPage(): TransactionAddPage { return new TransactionAddPage(this.page); }

    get MIDsPage(): MIDsPage { return new MIDsPage(this.page); }
    get internalMidsListPage(): InternalMidsListPage { return new InternalMidsListPage(this.page); }
    get newSecureDepositPage(): NewSecureDepositPage { return new NewSecureDepositPage(this.page); }
    get newAggregatedMidPage(): NewAggregatedMidPage { return new NewAggregatedMidPage(this.page); }
    get newInternalMidPage(): NewInternalMidPage { return new NewInternalMidPage(this.page); }
    get newExternalMidPage(): NewExternalMidPage { return new NewExternalMidPage(this.page); }
    get externalMidDetailsPage(): ExternalMidDetailsPage {return new ExternalMidDetailsPage(this.page)}
    get aggregatedMidDetailsPage(): AggregatedMidDetailsPage { return new AggregatedMidDetailsPage(this.page); }

    get emoneyPage(): EmoneyPage { return new EmoneyPage(this.page); }
    get newOperationalWalletPage(): NewOperationalWalletPage { return new NewOperationalWalletPage(this.page); }
    get newMerchantWalletPage(): NewMerchantWalletPage { return new NewMerchantWalletPage(this.page); }
    get customerWalletDetailsPage(): CustomerWalletDetailsPage { return new CustomerWalletDetailsPage(this.page); }
    get merchantWalletDetailsPage(): MerchantWalletDetailsPage { return new MerchantWalletDetailsPage(this.page); }
    get operationalWalletDetailsPage(): OperationalWalletDetailsPage { return new OperationalWalletDetailsPage(this.page); }
    get editMerchantWalletPage(): EditMerchantWalletPage { return new EditMerchantWalletPage(this.page); }
    get editFeeObjectPage(): EditFeeObjectPage { return new EditFeeObjectPage(this.page); }
    get ledgerPage(): LedgerPage {return new LedgerPage(this.page)}
    
    get ledgerAddOperationPage(): LedgerAddOperationPage { return new LedgerAddOperationPage(this.page); }
    get addLimitPage(): AddLimitPage { return new AddLimitPage(this.page); }
    get limitDetailsPage(): LimitDetailsPage { return new LimitDetailsPage(this.page); }
    get editLimitPage(): EditLimitPage { return new EditLimitPage(this.page); }

    get usersPage(): UsersPage { return new UsersPage(this.page); }
    get roleDetailsPage(): RoleDetailsPage { return new RoleDetailsPage(this.page); }
    get editRolePage(): EditRolePage { return new EditRolePage(this.page); }
    get newRolePage(): NewRolePage { return new NewRolePage(this.page); }
    get adminDetailsPage(): AdminDetailsPage { return new AdminDetailsPage(this.page); }
    get newAdminPage(): NewAdminPage { return new NewAdminPage(this.page); }

    get checkoutSettingsPage(): CheckoutSettingsPage {return new CheckoutSettingsPage(this.page); }
    get editProjectDetailsPage(): EditProjectPage {return new EditProjectPage(this.page); }
    get fxSpreadDetailsPage(): FxSpreadDetailsPage {return new FxSpreadDetailsPage(this.page);}
    get fxSpreadListPage(): FxSpreadListPage {return new FxSpreadListPage(this.page)}
}