import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { radii } from '../../constants/spacing';
import { animation } from '../../utils/animations';

type Props = {
    label: string;
    onPress: (label: string) => void;
    onLongPress?: () => void;
    variant?: 'number' | 'utility' | 'operator' | 'equals';
    wide?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function CalculatorButton({
    label,
    onPress,
    onLongPress,
    variant = 'number',
    wide = false,
}: Props) {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const variantStyle: ViewStyle =
        variant === 'equals'
            ? styles.equals
            : variant === 'operator'
                ? styles.operator
                : variant === 'utility'
                    ? styles.utility
                    : styles.number;

    return (
        <AnimatedPressable
            accessibilityRole="button"
            accessibilityLabel={label === '⌫' ? 'Delete' : label}
            android_ripple={{ color: colors.ripple, borderless: false }}
            onPress={() => onPress(label)}
            onLongPress={onLongPress}
            onPressIn={() => {
                scale.value = withTiming(0.96, { duration: animation.buttonDuration / 2 });
            }}
            onPressOut={() => {
                scale.value = withTiming(1, { duration: animation.buttonDuration / 2 });
            }}
            style={[styles.base, variantStyle, wide && styles.wide, animatedStyle]}>
            <Text
                style={[
                    styles.label,
                    variant === 'operator' && styles.operatorLabel,
                    variant === 'equals' && styles.equalsLabel,
                    variant === 'utility' && styles.utilityLabel,
                ]}>
                {label}
            </Text>
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        height: 64,
        borderRadius: radii.button,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
    },
    number: {
        backgroundColor: colors.white,
    },
    utility: {
        backgroundColor: colors.surface,
    },
    operator: {
        backgroundColor: colors.primarySoft,
        borderColor: '#BFDBFE',
    },
    equals: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.28,
        shadowRadius: 12,
        elevation: 8,
    },
    wide: {
        flex: 2.08,
    },
    label: {
        color: colors.text,
        fontSize: 25,
        fontWeight: fonts.semibold,
    },
    utilityLabel: {
        color: colors.textSecondary,
    },
    operatorLabel: {
        color: colors.primary,
        fontSize: 29,
    },
    equalsLabel: {
        color: colors.white,
        fontSize: 30,
    },
});
