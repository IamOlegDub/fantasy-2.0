import { create } from 'zustand';

// Define player and team types
export interface Player {
    player_id: number;
    player_type: 'Goalkeepers' | 'Defenders' | 'Midfielders' | 'Forwards'; // More specific type if known (e.g., 'Goalkeepers' | 'Defenders' | 'Midfielders' | 'Forwards')
    team_badge: string;
    player_image: string;
    player_name: string;
    player_rating: string;
    player_goals?: number;
    player_assists?: number;
    player_saves?: number;
    team_name: string;
}

interface TeamItem {
    team_badge: string;
    team_name: string;
    players: Player[];
}

// Define the store state
export interface PlayersState {
    fullTeams: TeamItem[];
    allPlayers: Player[];
    selectedPlayers: Player[];
    errorModalShown: string;
    isLoading: boolean;
    addPlayer: (playerToAdd: Player) => void;
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
