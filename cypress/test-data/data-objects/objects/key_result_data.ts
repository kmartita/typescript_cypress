export interface KeyResultData {
    name: string;
    type: string;
    owners: number[];
    steps_start: number | null;
    steps_end: number | null;
    unit: string | null;
    task_ids: any[];
    list_ids: any[];
}