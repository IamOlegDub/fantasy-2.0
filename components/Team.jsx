import Image from 'next/image';
import {
    DF,
    DF_COLOR,
    FW,
    FW_COLOR,
    GK,
    GK_COLOR,
    MF,
    MF_COLOR,
} from '@/config/consts';
import { formations } from '@/config/formations';
import TeamPlayer from './TeamPlayer.tsx';

const Team = ({ currentTeam, activeFormation }) => {
    const getPosition = (type, i) => {
        switch (type) {
            case 'Goalkeepers':
                return activeFormation.goalkeeperPosition[i];
            case 'Defenders':
                return activeFormation.defenderPositions[i];
            case 'Midfielders':
                return activeFormation.midfielderPositions[i];
            case 'Forwards':
                return activeFormation.forwardPositions[i];
            default:
                return {};
        }
    };

    const goalkeepers = currentTeam.filter(
        (teammate) => teammate.player_type === 'Goalkeepers'
    );
    const defenders = currentTeam.filter(
        (teammate) => teammate.player_type === 'Defenders'
    );
    const midfielders = currentTeam.filter(
        (teammate) => teammate.player_type === 'Midfielders'
    );
    const forwards = currentTeam.filter(
        (teammate) => teammate.player_type === 'Forwards'
    );

    console.log(currentTeam);

    return (
        <div className='relative mx-auto text-xs'>
            <Image
                className='mx-auto'
                src='/imgs/Football_field.png'
                alt='field'
                width={1920}
                height={1280}
            />
            {goalkeepers.map((player, i) => (
                <TeamPlayer
                    key={player.player_id}
                    player={player}
                    getPosition={getPosition}
                    i={i}
                    borderColor={`border-2 border-[#ff9f43]`}
                />
            ))}
            {defenders.map((player, i) => (
                <TeamPlayer
                    key={player.player_id}
                    player={player}
                    getPosition={getPosition}
                    i={i}
                    borderColor={`border-2 border-[#74b9ff]`}
                />
            ))}
            {midfielders.map((player, i) => (
                <TeamPlayer
                    key={player.player_id}
                    player={player}
                    getPosition={getPosition}
                    i={i}
                    borderColor={`border-2 border-[#55efc4]`}
                />
            ))}
            {forwards.map((player, i) => (
                <TeamPlayer
                    key={player.player_id}
                    player={player}
                    getPosition={getPosition}
                    i={i}
                    borderColor={`border-2 border-[#ee5253]`}
                />
            ))}
        </div>
    );
};

export default Team;
