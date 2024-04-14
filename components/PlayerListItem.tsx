import {
    getItemColor,
    getShortPosName,
    getTextColor,
} from '@/config/positions';
import { useState } from 'react';
import Button from './Button';
import { Modal } from './PlayerCard';
import Image from 'next/image';
import ImageWithFallback from './ImageWithFallback';
import usePlayersStore, { Player, PlayersState } from '@/store/playersStore';

interface PlayerListItemProps {
    player: Player;
}

const PlayerListItem = ({ player }: PlayerListItemProps) => {
    const [showModal, setShowModal] = useState(false);

    const addPlayer = usePlayersStore((state) => state.addPlayer);
    const removePlayer = usePlayersStore((state) => state.removePlayer);

    const onShowModal = () => {
        setShowModal(!showModal);
    };

    const bgItemListColor = getItemColor(player.player_type);
    const fontItemListColor = getTextColor(player.player_type);

    const handleAddPlayer = (player: Player) => {
        addPlayer(player);
    };

    const handleRemovePlayer = (playerId: number) => {
        removePlayer(playerId);
    };

    const selectedPlayers = usePlayersStore(
        (state: PlayersState) => state.selectedPlayers
    );

    const isPlayerSelected = (playerId: number) => {
        return selectedPlayers.some((p: Player) => p.player_id === playerId);
    };

    return (
        <div
            className={`flex flex-row p-1 items-center justify-between ${bgItemListColor} gap-1 relative rounded-md border min-h-item`}
        >
            {showModal && <Modal onShowModal={onShowModal} player={player} />}
            <div className='w-8 basis-1/12'>
                <Image
                    src={player.team_badge}
                    alt='logo'
                    width={20}
                    height={20}
                />
            </div>
            <div
                className={`font-bold basis-1/12 text-xs ${fontItemListColor}`}
            >
                {getShortPosName(player.player_type)}
            </div>
            <div className='w-8 basis-1/12 cursor-pointer'>
                <ImageWithFallback
                    src={player.player_image}
                    fallbackSrc='/imgs/footballer-ava.jpg'
                    alt='avatar'
                />
            </div>
            <div className='font-medium basis-2/12 text-start text-xs'>
                <button className='text-left' onClick={onShowModal}>
                    {player.player_name}
                </button>
            </div>
            <div className='italic basis-1/12 text-xs'>
                {player.player_rating}
            </div>
            <div className='italic basis-1/12 text-xs'>
                G:{player.player_goals || 0}
            </div>
            <div className='italic basis-1/12 text-xs'>
                A:{player.player_assists || 0}
            </div>
            <div className='italic basis-1/12 text-xs'>
                {player.player_type === 'Goalkeepers' &&
                    'S:' + (player.player_saves || 0)}
            </div>
            <div className='basis-1/12 text-end text-xs'>
                {player.team_name}
            </div>
            <div className='basis-1/12 text-xs'>
                {!isPlayerSelected(player.player_id) ? (
                    <Button
                        bgColor='bg-[#6c5ce7]'
                        activeBgColor='bg-violet-700 text-xs w-button h-button text-white'
                        handleClick={() => handleAddPlayer(player)}
                    >
                        +
                    </Button>
                ) : (
                    <Button
                        bgColor='bg-slate-50'
                        activeBgColor='bg-rose-700 text-xs w-button h-button border-2 border-[#6c5ce7] text-[#6c5ce7] leading-3'
                        handleClick={() => handleRemovePlayer(player.player_id)}
                    >
                        x
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PlayerListItem;
