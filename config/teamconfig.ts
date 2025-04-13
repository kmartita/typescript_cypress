export const teamconfig = (team_id: string) => ({
  url: {
      entities: {
          goals: `team/${team_id}/goal`
      }
  }
});