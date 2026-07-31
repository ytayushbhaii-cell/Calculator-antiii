import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppSettings, HistoryEntry } from '../types';

const HISTORY_KEY = '@calculator/history';
const SETTINGS_KEY = '@calculator/settings';

export const defaultSettings: AppSettings = {
    soundEnabled: true,
    hapticEnabled: true,
};

export async function loadHistory(): Promise<HistoryEntry[]> {
    try {
        const value = await AsyncStorage.getItem(HISTORY_KEY);
        return value ? JSON.parse(value) : [];
    } catch {
        return [];
    }
}

export async function saveHistory(history: HistoryEntry[]): Promise<void> {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export async function loadSettings(): Promise<AppSettings> {
    try {
        const value = await AsyncStorage.getItem(SETTINGS_KEY);
        return value ? { ...defaultSettings, ...JSON.parse(value) } : defaultSettings;
    } catch {
        return defaultSettings;
    }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
