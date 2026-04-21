import { Page } from '@playwright/test';
import { BaseReconReportPage, ReportFieldMapping } from './BaseReconReportPage';

export type TxStatusMismatchReportFields = 
{
    Project: string;
    Timezone: string;
    Time: string;
    TimeFrom: string;
    TimeTo: string;
    Provider: string;
    InternalMID: string;
    AggregatedMID: string;
    TransactionStatus: string;
}

export class RecTxStatusMismatchReportPage extends BaseReconReportPage<TxStatusMismatchReportFields>
{
    protected readonly fieldMapping: ReportFieldMapping<TxStatusMismatchReportFields> = 
    {
        Project           : { label: 'Project'            , type: 'dropdown' },
        Timezone          : { label: 'Timezone'           , type: 'dropdown' },
        Time              : { label: 'Time'               , type: 'dropdown' },
        TimeFrom          : { label: 'From'               , type: 'date'     },
        TimeTo            : { label: 'To'                 , type: 'date'     },
        Provider          : { label: 'Provider'           , type: 'dropdown' },
        InternalMID       : { label: 'Internal MIDs'      , type: 'dropdown' },
        AggregatedMID     : { label: 'Aggregated MIDs'    , type: 'dropdown' },
        TransactionStatus : { label: 'Transaction status' , type: 'dropdown' }
    };

    constructor(page: Page) 
    {
        super(page, /\/reports\/reconciliation\/rec-tx-status-mismatch/)
    }
}