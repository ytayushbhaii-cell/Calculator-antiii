/* eslint-env jest */

jest.mock('react-native-gesture-handler', () => {
    const React = require('react');
    const { View } = require('react-native');
    return {
        GestureHandlerRootView: props => React.createElement(View, props),
    };
});

jest.mock('react-native-reanimated', () => {
    const { View, Text, Pressable } = require('react-native');
    const createEntering = () => {
        const entering = {};
        entering.duration = () => entering;
        entering.springify = () => entering;
        return entering;
    };
    return {
        __esModule: true,
        default: {
            View,
            Text,
            Pressable,
            createAnimatedComponent: Component => Component,
        },
        createAnimatedComponent: Component => Component,
        useSharedValue: value => ({ value }),
        useAnimatedStyle: factory => factory(),
        withTiming: value => value,
        FadeInUp: createEntering(),
        View,
        Text,
        Pressable,
    };
});

jest.mock('react-native-sound', () => {
    function Sound(_file, _bundle, callback) {
        this.setVolume = jest.fn();
        this.play = jest.fn();
        this.stop = jest.fn(done => done && done());
        this.release = jest.fn();
        if (callback) {
            callback(null);
        }
    }
    Sound.setCategory = jest.fn();
    Sound.MAIN_BUNDLE = '';
    return Sound;
});

jest.mock('react-native-haptic-feedback', () => ({ trigger: jest.fn() }));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('@react-native-clipboard/clipboard', () => ({ setString: jest.fn() }));
