import { Page } from '@playwright/test';
import { BaseReconReportPage, ReportFieldMapping } from './BaseReconReportPage';

export type TransactionsReportFields = 
{
    Project: string;
    Timezone: string;
    Time: string;
    TimeFrom: string;
    TimeTo: string;
    Provider: string;
    Intermediary: string;
    PSP: string;
    InternalMID: string;
    AggregatedMID: string;
    TransactionType: string;
    Currency: string;
    TransactionStatus: string;
}

export class RecTransactionReportPage extends BaseReconReportPage<TransactionsReportFields>
{
    protected readonly fieldMapping: ReportFieldMapping<TransactionsReportFields> = 
    {
        Project           : { label: 'Project'           , type: 'dropdown' },
        Timezone          : { label: 'Timezone'          , type: 'dropdown' },
        Time              : { label: 'Time'              , type: 'dropdown' },
        TimeFrom          : { label: 'From'              , type: 'date'     },
        TimeTo            : { label: 'To'                , type: 'date'     },
        Provider          : { label: 'Provider'          , type: 'dropdown' },
        Intermediary      : { label: 'Intermediary'      , type: 'dropdown' },
        PSP               : { label: 'PSP'               , type: 'dropdown' },
        InternalMID       : { label: 'Internal MIDs'     , type: 'dropdown' },
        AggregatedMID     : { label: 'Aggregated MIDs'   , type: 'dropdown' },
        TransactionType   : { label: 'Transaction type'  , type: 'dropdown' },
        Currency          : { label: 'Currency'          , type: 'dropdown' },
        TransactionStatus : { label: 'Transaction status', type: 'dropdown' }
    };

    constructor(page: Page) 
    {
        super(page, /\/reports\/reconciliation\/rec-transactions\/?$/);
    }
}