import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../constants/spacing';
import { CalculatorButton } from '../Button/CalculatorButton';

type Props = {
    onPress: (key: string) => void;
};

const keys = [
    ['AC', '⌫', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
];

export function CalculatorKeyboard({ onPress }: Props) {
    return (
        <View style={styles.keyboard}>
            {keys.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map(key => (
                        <CalculatorButton
                            key={key}
                            label={key}
                            onPress={onPress}
                            wide={key === '0'}
                            variant={
                                key === '='
                                    ? 'equals'
                                    : ['÷', '×', '-', '+'].includes(key)
                                        ? 'operator'
                                        : ['AC', '⌫', '%'].includes(key)
                                            ? 'utility'
                                            : 'number'
                            }
                        />
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    keyboard: {
        gap: spacing.md,
    },
    row: {
        flexDirection: 'row',
        gap: spacing.md,
    },
});
