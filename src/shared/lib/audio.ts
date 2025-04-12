export function createLoopedAudio(src: string, volume: number): HTMLAudioElement {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    return audio;
}
