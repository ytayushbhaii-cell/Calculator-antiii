import Sound from 'react-native-sound';

let clickSound: Sound | null = null;
let initialized = false;

export function initializeSound(): void {
    if (initialized) {
        return;
    }
    initialized = true;
    Sound.setCategory('Ambient', true);
    clickSound = new Sound('click.wav', Sound.MAIN_BUNDLE, error => {
        if (error) {
            clickSound = null;
            return;
        }
        clickSound?.setVolume(0.12);
    });
}

export function playClick(enabled: boolean): void {
    if (!enabled || !clickSound) {
        return;
    }
    clickSound.stop(() => clickSound?.play());
}

export function releaseSound(): void {
    clickSound?.release();
    clickSound = null;
    initialized = false;
}
