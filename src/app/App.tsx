import './styles.css';
import { SoundPlayerControls } from '@/features/soundPlayer/ui/SoundPlayerControls';

export function App() {
    return (
        <>
            <div id="overlay" />
            <SoundPlayerControls />
        </>
    );
}
