import { useSoundPlayer } from '../model/useSoundPlayer';
import { SoundName } from '@/entities/sound/model/soundConfig';
import { Button } from '@/shared/ui/Button';

export function SoundPlayerControls() {
    const {
        currentSound,
        isPaused,
        volume,
        playSound,
        togglePlayPause,
        changeVolume,
    } = useSoundPlayer();

    const handleSelectSound = (sound: SoundName) => {
        if (currentSound === sound) return;
        playSound(sound);
    };

    return (
        <div className="container">
            <h1>Выберите шум природы</h1>
            <div className="buttons">
                <Button onClick={() => handleSelectSound('rain')}>Дождь</Button>
                <Button onClick={() => handleSelectSound('summer')}>Лето</Button>
                <Button onClick={() => handleSelectSound('winter')}>Зима</Button>
            </div>

            <div className="controls">
                <Button onClick={togglePlayPause} disabled={!currentSound}>
                    {isPaused ? '▶️ Воспроизвести' : '⏸️ Пауза'}
                </Button>
            </div>

            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
            />
        </div>
    );
}
