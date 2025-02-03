export enum ReportStatus {
    OPEN = "open",
    SOLVING = "solving",
    CLOSED = "closed"
}

export enum OperationResults {
    SUCCESS = "Operation completed successfully",
    FAILURE = "Operation failed"
}

export enum NotificationContents {
    NEW_REPORT_SPOT = "A new report near one of your favorite spots has been created",
    NEW_REPORT_GPS = "A new report near you has been created",
    REPORT_UPDATE = "One of your reports has an update"
}

export enum NotificationTypes {
    NEW_REPORT_SPOT = "new_report_spot",
    NEW_REPORT_GPS = "new_report_gps",
    REPORT_UPDATE = "report_update"
}