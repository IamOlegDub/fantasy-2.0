import React, { useState } from 'react';
import ImageWithFallback from './ImageWithFallback';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { Modal } from './PlayerCard';
import usePlayersStore, { Player } from '@/store/playersStore';

interface TeamPlayerProps {
    player: Player;
    getPosition: (type: string, index: number) => string;
    i: number;
    borderColor: string;
}

export default function TeamPlayer({
    player,
    getPosition,
    i,
    borderColor,
}: TeamPlayerProps) {
    const [showModal, setShowModal] = useState(false);

    const onShowModal = () => {
        setShowModal(!showModal);
    };

    const handleRemovePlayer = (
        event: React.MouseEvent<HTMLButtonElement>,
        playerId: number
    ) => {
        event.stopPropagation();
        event.preventDefault();

        const removePlayer = usePlayersStore.getState().removePlayer;
        removePlayer(playerId);
    };
    return (
        <div
            key={player.player_id}
            className={`absolute ${getPosition(
                player.player_type,
                i
            )} flex flex-col items-center z-30`}
        >
            {showModal && <Modal onShowModal={onShowModal} player={player} />}
            <div className='w-12 relative' onClick={() => {}}>
                <button
                    onClick={(e) => handleRemovePlayer(e, player.player_id)}
                    className=' bg-red-500 rounded-full p-1 text-slate-50 pb-1 absolute -top-2 -right-2'
                >
                    <XMarkIcon className='h-2 w-2' aria-hidden='true' />
                </button>
                <ImageWithFallback
                    borderColor={borderColor}
                    src={player.player_image}
                    fallbackSrc='imgs/footballer-ava.jpg'
                    alt='player-avatar'
                />
            </div>
            <button onClick={onShowModal}>
                <p className='text-slate-800 font-bold'>{player.player_name}</p>
            </button>
        </div>
    );
}
