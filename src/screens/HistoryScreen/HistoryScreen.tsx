import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { HistoryItem } from '../../components/HistoryItem/HistoryItem';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { radii, spacing } from '../../constants/spacing';
import type { AppScreen, HistoryEntry } from '../../types';

type Props = {
    history: HistoryEntry[];
    onNavigate: (screen: AppScreen) => void;
    onDelete: (id: string) => void;
    onClear: () => void;
    onReuse: (item: HistoryEntry) => void;
};

export function HistoryScreen({ history, onNavigate, onDelete, onClear, onReuse }: Props) {
    const confirmClear = () => {
        Alert.alert('Clear history?', 'This action cannot be undone.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Clear all', style: 'destructive', onPress: onClear },
        ]);
    };

    return (
        <View style={styles.container}>
            <AppHeader title="History" activeScreen="history" onNavigate={onNavigate} />
            <View style={styles.toolbar}>
                <Text style={styles.count}>{history.length} calculations</Text>
                {history.length > 0 && (
                    <Pressable onPress={confirmClear} style={styles.clearButton}>
                        <Text style={styles.clearText}>Clear all</Text>
                    </Pressable>
                )}
            </View>
            <FlatList
                data={history}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <HistoryItem item={item} onDelete={onDelete} onReuse={onReuse} />
                )}
                contentContainerStyle={history.length ? styles.list : styles.emptyList}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyIcon}>◷</Text>
                        <Text style={styles.emptyTitle}>No calculations yet</Text>
                        <Text style={styles.emptyText}>Completed calculations will appear here automatically.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: spacing.lg,
    },
    count: { color: colors.textSecondary, fontSize: 14, fontWeight: fonts.medium },
    clearButton: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
    clearText: { color: colors.danger, fontWeight: fonts.semibold },
    list: { paddingBottom: spacing.xxxl },
    emptyList: { flexGrow: 1, justifyContent: 'center' },
    emptyCard: {
        borderRadius: radii.display,
        padding: spacing.xxxl,
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },
    emptyIcon: { fontSize: 42, color: colors.primary, marginBottom: spacing.md },
    emptyTitle: { fontSize: 20, color: colors.text, fontWeight: fonts.bold },
    emptyText: {
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 21,
        marginTop: spacing.sm,
    },
});
