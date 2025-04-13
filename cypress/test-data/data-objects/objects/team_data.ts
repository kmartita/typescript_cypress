export interface TeamData {
    id: string;
    members: [
        {
            user: {
                id: string;
                username: string;
            }
        }
    ];
}