import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { radii, spacing } from '../../constants/spacing';
import { animation } from '../../utils/animations';

type Props = {
    expression: string;
    result: string | null;
    error: string | null;
    onCopyResult: () => void;
};

export function CalculatorDisplay({ expression, result, error, onCopyResult }: Props) {
    const questionProgress = useSharedValue(result || error ? 1 : 0);

    useEffect(() => {
        questionProgress.value = withTiming(result || error ? 1 : 0, {
            duration: animation.resultDuration,
        });
    }, [error, questionProgress, result]);

    const questionStyle = useAnimatedStyle(() => ({
        opacity: 1 - questionProgress.value * 0.65,
        transform: [{ translateY: -8 * questionProgress.value }],
    }));

    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <Animated.Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.4}
                    style={[
                        styles.expression,
                        result || error ? styles.expressionComplete : styles.expressionActive,
                        questionStyle,
                    ]}>
                    {expression || '0'}
                </Animated.Text>
                {error ? (
                    <Animated.Text entering={FadeInUp.duration(250)} style={styles.error}>
                        {error}
                    </Animated.Text>
                ) : result ? (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Copy result"
                        onLongPress={onCopyResult}
                        delayLongPress={350}>
                        <Animated.Text
                            entering={FadeInUp.duration(250).springify()}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            minimumFontScale={0.35}
                            style={styles.result}>
                            {result}
                        </Animated.Text>
                    </Pressable>
                ) : (
                    <Text style={styles.hint}>Enter a calculation</Text>
                )}
            </View>
            <Text style={styles.copyHint}>{result ? 'Hold result to copy' : 'Fast • Accurate • Offline'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minHeight: 190,
        maxHeight: 260,
        backgroundColor: colors.surface,
        borderRadius: radii.display,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.xxl,
        justifyContent: 'space-between',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.07,
        shadowRadius: 20,
        elevation: 3,
    },
    content: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100%',
    },
    expression: {
        width: '100%',
        textAlign: 'right',
        color: colors.text,
    },
    expressionActive: {
        fontSize: 47,
        fontWeight: fonts.bold,
    },
    expressionComplete: {
        fontSize: 24,
        fontWeight: fonts.medium,
    },
    result: {
        width: '100%',
        color: colors.text,
        fontSize: 56,
        lineHeight: 68,
        fontWeight: fonts.bold,
        textAlign: 'right',
    },
    error: {
        color: colors.danger,
        fontSize: 25,
        fontWeight: fonts.bold,
        marginTop: spacing.md,
        textAlign: 'right',
    },
    hint: {
        color: colors.textSecondary,
        fontSize: 15,
        marginTop: spacing.sm,
    },
    copyHint: {
        color: colors.textSecondary,
        fontSize: 12,
        textAlign: 'right',
    },
});
