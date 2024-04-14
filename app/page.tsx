'use client';
import { useEffect, useState } from 'react';
import { collection, addDoc, Firestore } from 'firebase/firestore';
import usePlayersStore, { Player } from '@/store/playersStore';
import useUserStore from '@/store/userStore';
import Team from '@/components/Team';
import { Formation, formations } from '@/config/formations';
import MyLink from '@/components/MyLink';
import Button from '@/components/Button';
import { db } from '@/config/firebase';
import { useRouter } from 'next/navigation';

const Cabinet = () => {
    const router = useRouter();
    const [activeFormation, setActiveFormation] = useState<Formation>(
        formations[0]
    );
    const currentTeam = usePlayersStore((state) => state.selectedPlayers);
    const currentUser = useUserStore((state) => state.user);

    const currentTeamObj = currentTeam.reduce<Record<string, Player>>(
        (result, item) => {
            result[item.player_name] = item;
            return result;
        },
        {}
    );

    const handleChangeFormation = (i: number): void => {
        setActiveFormation(formations[i]);
    };

    // Function to add team to Firestore
    const addToFirestore = async () => {
        if (!currentUser || !currentUser.displayName) return;

        try {
            const docRef = await addDoc(
                collection(
                    db as Firestore,
                    `teamOf${currentUser.displayName.trim()}`
                ),
                currentTeamObj
            );
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    useEffect(() => {
        if (!currentUser) {
            router.replace('/login');
        }
    }, []);

    return (
        <div className='flex flex-row gap-10 '>
            <div className='flex-grow items-center flex-col justify-center'>
                <Team
                    currentTeam={currentTeam}
                    activeFormation={activeFormation}
                />
                <div className='flex flex-col items-center gap-5 flex-grow relative'>
                    <div className='flex gap-2 mt-32'>
                        {formations.map((formation, i) => (
                            <div
                                key={formation.name}
                                className={`border p-1 rounded-md ${
                                    formation.name === activeFormation.name &&
                                    'bg-violet-400'
                                }`}
                                onClick={() => handleChangeFormation(i)}
                            >
                                {formation.name}
                            </div>
                        ))}
                    </div>
                    <div className='flex gap-2'>
                        <MyLink linkTo='/list'>
                            {currentTeam.length > 0
                                ? 'Manage team'
                                : 'Create team'}
                        </MyLink>
                        <Button
                            border={`text-slate-50 ${
                                currentTeam.length < 15 && 'bg-slate-500'
                            }`}
                            handleClick={addToFirestore}
                        >
                            Initiate team
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cabinet;
