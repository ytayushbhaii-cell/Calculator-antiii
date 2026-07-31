import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
    enableVibrateFallback: false,
    ignoreAndroidSystemSettings: false,
};

export function triggerLightHaptic(enabled: boolean): void {
    if (enabled) {
        ReactNativeHapticFeedback.trigger('impactLight', options);
    }
}
