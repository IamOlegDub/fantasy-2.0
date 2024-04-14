import { create } from 'zustand';

type NationalTeamName =
    | 'Germany'
    | 'Belgium'
    | 'France'
    | 'Portugal'
    | 'Scotland'
    | 'Spain'
    | 'Turkey'
    | 'Austria'
    | 'England'
    | 'Hungary'
    | 'Slovakia'
    | 'Albania'
    | 'Denmark'
    | 'Netherlands'
    | 'Romania'
    | 'Switzerland'
    | 'Serbia'
    | 'Czech Republic'
    | 'Italy'
    | 'Slovenia'
    | 'Croatia'
    | 'Georgia'
    | 'Ukraine'
    | 'Poland';

export interface Footballer {
    player_id: number;
    player_type: 'Goalkeepers' | 'Defenders' | 'Midfielders' | 'Forwards';
    team_badge: string;
    player_name: string;
    national_team_name: keyof NationalTeamName;
    team_name: string;
    appearances: string;
    goals: string;
}

interface TeamItem {
    team_badge: string;
    team_name: string;
    players: Footballer[];
}

export interface PlayersState {
    fullTeams: TeamItem[];
    allPlayers: Footballer[];
    selectedPlayers: Footballer[];
    errorModalShown: string;
    isLoading: boolean;
    addPlayer: (playerToAdd: Footballer) => void;
    removePlayer: (playerId: number) => void;
    setAllPlayers: (playersInTeams: TeamItem[]) => void;
    closeErrorModal: () => void;
}

const usePlayersStore = create<PlayersState>((set, get) => ({
    fullTeams: [],
    allPlayers: [],
    selectedPlayers: [],
    errorModalShown: '',
    isLoading: false,

    addPlayer: (playerToAdd) => {
        const { selectedPlayers } = get();
        const isPlayerAlreadySelected = selectedPlayers.some(
            (player) => player.player_id === playerToAdd.player_id
        );
        const gk = selectedPlayers.filter(
            (player) => player.player_type === 'Goalkeepers'
        );
        const df = selectedPlayers.filter(
            (player) => player.player_type === 'Defenders'
        );
        const mf = selectedPlayers.filter(
            (player) => player.player_type === 'Midfielders'
        );
        const fw = selectedPlayers.filter(
            (player) => player.player_type === 'Forwards'
        );
        const teamNumber = selectedPlayers.filter(
            (player) => player.team_name === playerToAdd.team_name
        );

        if (selectedPlayers.length >= 15) {
            set({ errorModalShown: `Your team is full` });
            return;
        }
        if (!isPlayerAlreadySelected) {
            if (teamNumber.length > 2) {
                set({
                    errorModalShown: `The maximum number of ${playerToAdd.team_name} players has been reached`,
                });
                return;
            }
            if (gk.length > 1 && playerToAdd.player_type === 'Goalkeepers') {
                set({
                    errorModalShown:
                        'The maximum number of goalkeepers has been reached',
                });
                return;
            }
            if (df.length > 4 && playerToAdd.player_type === 'Defenders') {
                set({
                    errorModalShown:
                        'The maximum number of defenders has been reached',
                });
                return;
            }
            if (mf.length > 4 && playerToAdd.player_type === 'Midfielders') {
                set({
                    errorModalShown:
                        'The maximum number of midfielders has been reached',
                });
                return;
            }
            if (fw.length > 2 && playerToAdd.player_type === 'Forwards') {
                set({
                    errorModalShown:
                        'The maximum number of forwards has been reached',
                });
                return;
            }
            set({ selectedPlayers: [...selectedPlayers, playerToAdd] });
        }
    },

    removePlayer: (playerId) => {
        const { selectedPlayers } = get();
        set({
            selectedPlayers: selectedPlayers.filter(
                (player) => player.player_id !== playerId
            ),
        });
    },

    setAllPlayers: (playersInTeams) => {
        set({ isLoading: true });
        const players = playersInTeams.flatMap((teamItem) => {
            return teamItem.players.map((player) => ({
                ...player,
                team_badge: teamItem.team_badge,
                team_name: teamItem.team_name,
            }));
        });
        set({
            allPlayers: players,
            fullTeams: playersInTeams,
            isLoading: false,
        });
    },

    closeErrorModal: () => set({ errorModalShown: '' }),
}));

export default usePlayersStore;
