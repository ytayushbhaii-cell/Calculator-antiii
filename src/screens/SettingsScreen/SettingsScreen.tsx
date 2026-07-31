import React from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { radii, spacing } from '../../constants/spacing';
import type { AppScreen, AppSettings } from '../../types';

type Props = {
    settings: AppSettings;
    historyCount: number;
    onNavigate: (screen: AppScreen) => void;
    onChangeSettings: (settings: AppSettings) => void;
    onClearHistory: () => void;
};

export function SettingsScreen({
    settings,
    historyCount,
    onNavigate,
    onChangeSettings,
    onClearHistory,
}: Props) {
    const clearHistory = () => {
        Alert.alert('Clear history?', `${historyCount} calculations will be deleted.`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Clear', style: 'destructive', onPress: onClearHistory },
        ]);
    };

    return (
        <View style={styles.container}>
            <AppHeader title="Settings" activeScreen="settings" onNavigate={onNavigate} />
            <Text style={styles.sectionTitle}>FEEDBACK</Text>
            <View style={styles.card}>
                <SettingRow
                    title="Button sounds"
                    description="Play a subtle click on every press"
                    value={settings.soundEnabled}
                    onChange={soundEnabled => onChangeSettings({ ...settings, soundEnabled })}
                />
                <View style={styles.divider} />
                <SettingRow
                    title="Haptic feedback"
                    description="Light vibration on supported devices"
                    value={settings.hapticEnabled}
                    onChange={hapticEnabled => onChangeSettings({ ...settings, hapticEnabled })}
                />
            </View>

            <Text style={styles.sectionTitle}>APPEARANCE</Text>
            <View style={styles.card}>
                <View style={styles.row}>
                    <View style={styles.rowText}>
                        <Text style={styles.title}>Theme</Text>
                        <Text style={styles.description}>Premium white and blue</Text>
                    </View>
                    <View style={styles.badge}><Text style={styles.badgeText}>Light</Text></View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>DATA</Text>
            <Pressable
                disabled={historyCount === 0}
                onPress={clearHistory}
                style={[styles.card, styles.clearRow, historyCount === 0 && styles.disabled]}>
                <View>
                    <Text style={styles.dangerTitle}>Clear history</Text>
                    <Text style={styles.description}>{historyCount} saved calculations</Text>
                </View>
                <Text style={styles.dangerTitle}>Clear</Text>
            </Pressable>
            <Text style={styles.footer}>Calculator 1.0 • Offline and private</Text>
        </View>
    );
}

type SettingRowProps = {
    title: string;
    description: string;
    value: boolean;
    onChange: (value: boolean) => void;
};

function SettingRow({ title, description, value, onChange }: SettingRowProps) {
    return (
        <View style={styles.row}>
            <View style={styles.rowText}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{ false: colors.border, true: colors.primarySoft }}
                thumbColor={value ? colors.primary : '#9CA3AF'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    sectionTitle: {
        marginTop: spacing.xxl,
        marginBottom: spacing.sm,
        marginLeft: spacing.xs,
        color: colors.textSecondary,
        fontSize: 11,
        letterSpacing: 1.3,
        fontWeight: fonts.bold,
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: radii.card,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: spacing.lg,
    },
    row: { minHeight: 76, flexDirection: 'row', alignItems: 'center' },
    rowText: { flex: 1, paddingRight: spacing.md },
    title: { color: colors.text, fontSize: 16, fontWeight: fonts.semibold },
    description: { color: colors.textSecondary, fontSize: 13, marginTop: spacing.xs },
    divider: { height: 1, backgroundColor: colors.border },
    badge: { backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 13, paddingVertical: 7 },
    badgeText: { color: colors.primary, fontWeight: fonts.semibold, fontSize: 13 },
    clearRow: { minHeight: 76, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    dangerTitle: { color: colors.danger, fontSize: 15, fontWeight: fonts.semibold },
    disabled: { opacity: 0.45 },
    footer: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxxl, fontSize: 12 },
});
