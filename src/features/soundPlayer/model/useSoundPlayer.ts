import { useState, useRef } from 'react';
import { SoundName, soundConfig } from '@/entities/sound/model/soundConfig';
import { createLoopedAudio } from '@/shared/lib/audio';

export function useSoundPlayer() {
    const [currentSound, setCurrentSound] = useState<SoundName | null>(null);
    const [isPaused, setIsPaused] = useState(true);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playSound = (sound: SoundName) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const audio = createLoopedAudio(soundConfig[sound].src, volume);
        audio.play();
        audioRef.current = audio;

        setCurrentSound(sound);
        setIsPaused(false);

        document.body.style.backgroundImage = `url(${soundConfig[sound].bg})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    };

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        isPaused ? audioRef.current.play() : audioRef.current.pause();
        setIsPaused(!isPaused);
    };

    const changeVolume = (value: number) => {
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value;
        }
    };

    return {
        currentSound,
        isPaused,
        volume,
        playSound,
        togglePlayPause,
        changeVolume,
    };
}
