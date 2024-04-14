'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Position, getShortPosName } from '@/config/positions';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import usePlayersStore, { Player } from '@/store/playersStore';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';
import FilterPlayersButton from '@/components/FilterPlayersButton';
import PlayerListItem from '@/components/PlayerListItem';

const List = () => {
    const [activeListItem, setActiveListItem] = useState<string>('All');
    const [activeTeamItem, setActiveTeamItem] = useState<string>('All');
    const [allPlayersSortingType, setAllPlayersSortingType] =
        useState<keyof Player>('team_name');

    const [isSortingByString, setIsSortingByString] = useState<boolean>(false);
    const [isFilterPositionsShown, setIsFilterPositionsShown] =
        useState<boolean>(false);
    const [isFilterTeamsShown, setIsFilterTeamsShown] =
        useState<boolean>(false);
    const [trueDirection, setTrueDirection] = useState<boolean>(true);

    const positionsRef = useRef<HTMLDivElement>(null);
    const teamsRef = useRef<HTMLDivElement>(null);

    const {
        fullTeams,
        isLoading,
        errorModalShown,
        allPlayers,
        setAllPlayers,
        closeErrorModal,
    } = usePlayersStore();

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const url = process.env.API_URL;
    const query = process.env.API_QUERY;

    const getList = useCallback(async () => {
        try {
            const response = await fetch(`${url}${query}APIkey=${apiKey}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setAllPlayers(data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }, [url, query, apiKey, setAllPlayers]);

    useEffect(() => {
        if (errorModalShown) {
            const timer = setTimeout(() => {
                closeErrorModal();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [errorModalShown]);

    useEffect(() => {
        getList();
    }, [getList]);

    const positions = ['GK', 'DF', 'MF', 'FW'];

    const filterPositionsList = (position: string) => {
        setActiveListItem(position);
        toggleFilterPositions();
    };

    const filterTeamsList = (team: string) => {
        setActiveTeamItem(team);
        toggleFilterTeams();
    };

    const sortObjectsByKey = <T extends object>(
        objects: T[],
        key: keyof T,
        isSortByString: boolean,
        trueDirection: boolean
    ): T[] => {
        return objects.slice().sort((a, b) => {
            if (!isSortByString) {
                return trueDirection
                    ? (b[key] as any) - (a[key] as any)
                    : (a[key] as any) - (b[key] as any);
            } else {
                if (a[key] < b[key]) return trueDirection ? -1 : 1;
                if (a[key] > b[key]) return trueDirection ? 1 : -1;
                return 0;
            }
        });
    };

    const sortedAllPlayers = sortObjectsByKey(
        allPlayers,
        allPlayersSortingType,
        isSortingByString,
        trueDirection
    );

    const toggleFilterPositions = () => {
        setIsFilterPositionsShown((prev) => !prev);
    };
    const toggleFilterTeams = () => {
        setIsFilterTeamsShown((prev) => !prev);
    };

    useOutsideClick(positionsRef, () => {
        setIsFilterPositionsShown(false);
    });
    useOutsideClick(teamsRef, () => {
        setIsFilterTeamsShown(false);
    });

    const filterAllPlayers = (
        objects: Player[],
        key: keyof Player,
        filteringItem: string
    ): Player[] => {
        return objects.filter((object) => {
            if (filteringItem === 'All') {
                return true; // Include all players if the filter item is 'All'
            }
            // Get the short position name and compare it
            return getShortPosName(object[key] as Position) === filteringItem;
        });
    };

    const filteredAllPlayersByPositions = filterAllPlayers(
        sortedAllPlayers,
        'player_type',
        activeListItem
    );
    const filteredAllPlayersByTeams = filterAllPlayers(
        filteredAllPlayersByPositions,
        'team_name',
        activeTeamItem
    );

    const handleSortPlayers = (type: keyof Player, isString: boolean) => {
        setAllPlayersSortingType(type);
        setIsSortingByString(isString);
        if (type === allPlayersSortingType) {
            setTrueDirection((prev) => !prev);
        } else {
            setTrueDirection(true);
        }
    };

    if (isLoading) return <Loading />;
    return (
        <div className='container mx-auto '>
            {errorModalShown && <ErrorMessage message={errorModalShown} />}
            <div className='flex flex-col gap-2 fixed top-1 left-1/2 -translate-x-1/2 z-30 rounded-md shadow-md p-3 bg-slate-50'>
                <div className='flex gap-1 text-xs items-center'>
                    <p className='text-sm'>Filter by position: </p>
                    <FilterPlayersButton
                        refItem={positionsRef}
                        toggleFilterItems={toggleFilterPositions}
                        activeItem={activeListItem}
                        isFilterItemsShown={isFilterPositionsShown}
                        filterItems={positions}
                        filterList={filterPositionsList}
                    />
                    <p className='ml-2 text-sm'>Filter by team: </p>
                    <FilterPlayersButton
                        refItem={teamsRef}
                        toggleFilterItems={toggleFilterTeams}
                        activeItem={activeTeamItem}
                        isFilterItemsShown={isFilterTeamsShown}
                        filterItems={fullTeams.map((team) => team.team_name)}
                        filterList={filterTeamsList}
                    />
                </div>
                <div className='flex gap-1 text-xs'>
                    <button
                        className='p-2 border rounded-md w-fit'
                        onClick={() =>
                            handleSortPlayers('player_rating', false)
                        }
                    >
                        Rate
                        {allPlayersSortingType === 'player_rating' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                    <button
                        className='p-2 border rounded-md w-fit'
                        onClick={() => handleSortPlayers('player_type', true)}
                    >
                        Pos
                        {allPlayersSortingType === 'player_type' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                    <button
                        className='p-2 border rounded-md w-fit'
                        onClick={() => handleSortPlayers('player_name', true)}
                    >
                        Name
                        {allPlayersSortingType === 'player_name' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                    <button
                        className='p-2 py-1 border rounded-md w-fit'
                        onClick={() => handleSortPlayers('team_name', true)}
                    >
                        Team
                        {allPlayersSortingType === 'team_name' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                    <button
                        className='p-2 py-1 border rounded-md w-fit'
                        onClick={() => handleSortPlayers('player_goals', false)}
                    >
                        Goals
                        {allPlayersSortingType === 'player_goals' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                    <button
                        className='p-2 py-1 border rounded-md w-fit'
                        onClick={() =>
                            handleSortPlayers('player_assists', false)
                        }
                    >
                        Assists
                        {allPlayersSortingType === 'player_assists' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                    <button
                        className='p-2 py-1 border rounded-md w-fit'
                        onClick={() => setAllPlayersSortingType('player_id')}
                    >
                        Points
                        {allPlayersSortingType === 'player_id' &&
                            (trueDirection ? '↓' : '↑')}
                    </button>
                </div>
            </div>

            <div className='flex flex-col gap-2 mt-28'>
                {filteredAllPlayersByTeams.map((player) => (
                    <PlayerListItem key={player.player_id} player={player} />
                ))}
            </div>
        </div>
    );
};

export default List;
