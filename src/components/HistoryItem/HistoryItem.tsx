import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { radii, spacing } from '../../constants/spacing';
import type { HistoryEntry } from '../../types';

type Props = {
    item: HistoryEntry;
    onDelete: (id: string) => void;
    onReuse: (item: HistoryEntry) => void;
};

export function HistoryItem({ item, onDelete, onReuse }: Props) {
    const copy = () => {
        Clipboard.setString(item.result);
        Alert.alert('Copied', 'Result copied to clipboard.');
    };

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.expression} equals ${item.result}`}
            android_ripple={{ color: colors.ripple }}
            onPress={() => onReuse(item)}
            onLongPress={() => onDelete(item.id)}
            style={styles.card}>
            <View style={styles.values}>
                <Text numberOfLines={1} style={styles.expression}>
                    {item.expression}
                </Text>
                <Text numberOfLines={1} style={styles.result}>
                    = {item.result}
                </Text>
            </View>
            <View style={styles.actions}>
                <Pressable onPress={copy} hitSlop={10} style={styles.actionButton}>
                    <Text style={styles.copy}>Copy</Text>
                </Pressable>
                <Pressable onPress={() => onDelete(item.id)} hitSlop={10} style={styles.actionButton}>
                    <Text style={styles.delete}>Delete</Text>
                </Pressable>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: radii.card,
        borderWidth: 1,
        borderColor: colors.border,
        padding: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
        overflow: 'hidden',
    },
    values: {
        flex: 1,
        marginRight: spacing.md,
    },
    expression: {
        color: colors.textSecondary,
        fontSize: 15,
        fontWeight: fonts.medium,
    },
    result: {
        color: colors.text,
        fontSize: 23,
        fontWeight: fonts.bold,
        marginTop: spacing.xs,
    },
    actions: {
        alignItems: 'flex-end',
        gap: spacing.sm,
    },
    actionButton: {
        paddingVertical: spacing.xs,
    },
    copy: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: fonts.semibold,
    },
    delete: {
        color: colors.danger,
        fontSize: 13,
        fontWeight: fonts.semibold,
    },
});
