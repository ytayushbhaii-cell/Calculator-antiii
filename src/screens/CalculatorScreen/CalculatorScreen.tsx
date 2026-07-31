import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { AppHeader } from '../../components/AppHeader';
import { CalculatorDisplay } from '../../components/Display/CalculatorDisplay';
import { CalculatorKeyboard } from '../../components/Keyboard/CalculatorKeyboard';
import { spacing } from '../../constants/spacing';
import type { AppScreen, AppSettings, HistoryEntry } from '../../types';
import {
    appendInput,
    applyPercentage,
    evaluateExpression,
    toggleSign,
} from '../../utils/calculatorEngine';
import { triggerLightHaptic } from '../../utils/haptics';
import { playClick } from '../../utils/sound';

type Props = {
    settings: AppSettings;
    initialExpression?: string;
    onNavigate: (screen: AppScreen) => void;
    onAddHistory: (entry: HistoryEntry) => void;
    onConsumeInitialExpression: () => void;
};

export function CalculatorScreen({
    settings,
    initialExpression,
    onNavigate,
    onAddHistory,
    onConsumeInitialExpression,
}: Props) {
    const [expression, setExpression] = useState(initialExpression ?? '');
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        if (initialExpression) {
            setExpression(initialExpression);
            setResult(null);
            setError(null);
            onConsumeInitialExpression();
        }
    }, [initialExpression, onConsumeInitialExpression]);

    const copyResult = useCallback(() => {
        if (result) {
            Clipboard.setString(result);
            triggerLightHaptic(settings.hapticEnabled);
            Alert.alert('Copied', 'Result copied to clipboard.');
        }
    }, [result, settings.hapticEnabled]);

    const handlePress = useCallback(
        (key: string) => {
            playClick(settings.soundEnabled);
            triggerLightHaptic(settings.hapticEnabled);
            setError(null);

            if (key === 'AC') {
                setExpression('');
                setResult(null);
                return;
            }
            if (key === '⌫') {
                if (result) {
                    setExpression('');
                    setResult(null);
                } else {
                    setExpression(current => current.slice(0, -1));
                }
                return;
            }
            if (key === '=') {
                if (!expression) {
                    return;
                }
                const evaluation = evaluateExpression(expression);
                if (!evaluation.ok) {
                    setResult(null);
                    setError(evaluation.error);
                    return;
                }
                setResult(evaluation.formatted);
                onAddHistory({
                    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                    expression,
                    result: evaluation.formatted,
                    createdAt: Date.now(),
                });
                return;
            }
            if (key === '%') {
                setResult(null);
                setExpression(current => applyPercentage(current));
                return;
            }
            if (key === '±') {
                setResult(null);
                setExpression(current => toggleSign(current));
                return;
            }

            setExpression(current => appendInput(result ? '' : current, key));
            setResult(null);
        },
        [expression, onAddHistory, result, settings.hapticEnabled, settings.soundEnabled],
    );

    return (
        <View style={styles.container}>
            <AppHeader title="Calculator" activeScreen="calculator" onNavigate={onNavigate} />
            <CalculatorDisplay
                expression={expression}
                result={result}
                error={error}
                onCopyResult={copyResult}
            />
            <View style={styles.keyboard}>
                <CalculatorKeyboard onPress={handlePress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboard: {
        marginTop: spacing.lg,
    },
});
