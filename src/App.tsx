import { useState, useRef } from 'react';
import './App.css';

type SoundName = 'rain' | 'summer' | 'winter';

const soundConfig: Record<SoundName, { src: string; bg: string }> = {
    rain: {
        src: '/assets/sounds/rain.mp3',
        bg: '/assets/rainy-bg.jpg',
    },
    summer: {
        src: '/assets/sounds/summer.mp3',
        bg: '/assets/summer-bg.jpg',
    },
    winter: {
        src: '/assets/sounds/winter.mp3',
        bg: '/assets/winter-bg.jpg',
    },
};

function App() {
    const [currentSound, setCurrentSound] = useState<SoundName | null>(null);
    const [isPaused, setIsPaused] = useState(true);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playSound = (sound: SoundName) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const audio = new Audio(soundConfig[sound].src);
        audio.loop = true;
        audio.volume = volume;
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

        if (isPaused) {
            audioRef.current.play();
            setIsPaused(false);
        } else {
            audioRef.current.pause();
            setIsPaused(true);
        }
    };

    const handleSelectSound = (sound: SoundName) => {
        if (currentSound === sound) return; // не перезапускаем
        playSound(sound);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className="container">
            <h1>Выберите шум природы</h1>
            <div className="buttons">
                <button onClick={() => handleSelectSound('rain')}>Дождь</button>
                <button onClick={() => handleSelectSound('summer')}>Лето</button>
                <button onClick={() => handleSelectSound('winter')}>Зима</button>
            </div>

            <div className="controls">
                <button
                    onClick={togglePlayPause}
                    disabled={!currentSound}
                >
                    {isPaused ? '▶️ Воспроизвести' : '⏸️ Пауза'}
                </button>
            </div>

            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
    );
}

export default App;
