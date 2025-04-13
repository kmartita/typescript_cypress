export interface GoalData {
    id: string;
    pretty_id: string;
    name: string;
    team_id: string;
    creator: number;
    color: string;
    date_created: string;
    start_date: string | null;
    due_date: string;
    description: string;
    private: boolean;
    archived: boolean;
    multiple_owners: boolean;
    editor_token: string;
    date_updated: string;
    folder_id: string | null;
    folder_name: string | null;
    members: [];
    group_members: [];
    owners: [
        {
            id: number;
            username: string;
            email: string;
            color: string;
            profilePicture: null;
            initials: string;
        }
    ];
    key_results: [];
    key_result_count: number;
    percent_completed: number;
    history: [];
    pretty_url: string;
}