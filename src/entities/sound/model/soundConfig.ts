export type SoundName = 'rain' | 'summer' | 'winter';

export const soundConfig: Record<SoundName, { src: string; bg: string }> = {
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
