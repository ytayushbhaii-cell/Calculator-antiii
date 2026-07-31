import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { spacing } from '../constants/spacing';
import type { AppScreen } from '../types';

type Props = {
    title: string;
    activeScreen: AppScreen;
    onNavigate: (screen: AppScreen) => void;
};

export function AppHeader({ title, activeScreen, onNavigate }: Props) {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.eyebrow}>CALCULATOR</Text>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.navigation}>
                <Pressable
                    accessibilityLabel="Open calculator"
                    onPress={() => onNavigate('calculator')}
                    style={[styles.navButton, activeScreen === 'calculator' && styles.active]}>
                    <Text style={[styles.navText, activeScreen === 'calculator' && styles.activeText]}>123</Text>
                </Pressable>
                <Pressable
                    accessibilityLabel="Open history"
                    onPress={() => onNavigate('history')}
                    style={[styles.navButton, activeScreen === 'history' && styles.active]}>
                    <Text style={[styles.navText, activeScreen === 'history' && styles.activeText]}>History</Text>
                </Pressable>
                <Pressable
                    accessibilityLabel="Open settings"
                    onPress={() => onNavigate('settings')}
                    style={[styles.navButton, activeScreen === 'settings' && styles.active]}>
                    <Text style={[styles.navText, activeScreen === 'settings' && styles.activeText]}>⚙</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    eyebrow: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: fonts.bold,
        letterSpacing: 1.8,
    },
    title: {
        color: colors.text,
        fontSize: 25,
        fontWeight: fonts.bold,
    },
    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    navButton: {
        minWidth: 40,
        height: 38,
        paddingHorizontal: spacing.sm,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundColor: colors.primarySoft,
    },
    navText: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: fonts.semibold,
    },
    activeText: {
        color: colors.primary,
    },
});
