/**
 * Professional Calculator
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/constants/colors';
import { spacing } from './src/constants/spacing';
import { CalculatorScreen } from './src/screens/CalculatorScreen/CalculatorScreen';
import { HistoryScreen } from './src/screens/HistoryScreen/HistoryScreen';
import { SettingsScreen } from './src/screens/SettingsScreen/SettingsScreen';
import type { AppScreen, AppSettings, HistoryEntry } from './src/types';
import {
  defaultSettings,
  loadHistory,
  loadSettings,
  saveHistory,
  saveSettings,
} from './src/utils/storage';
import { initializeSound, releaseSound } from './src/utils/sound';

function App(): React.JSX.Element {
  const [screen, setScreen] = useState<AppScreen>('calculator');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [reuseExpression, setReuseExpression] = useState<string | undefined>();

  useEffect(() => {
    Promise.all([loadHistory(), loadSettings()]).then(
      ([savedHistory, savedSettings]) => {
        setHistory(savedHistory);
        setSettings(savedSettings);
      },
    );
    initializeSound();
    return releaseSound;
  }, []);

  const updateHistory = useCallback((nextHistory: HistoryEntry[]) => {
    setHistory(nextHistory);
    saveHistory(nextHistory).catch(() => undefined);
  }, []);

  const addHistory = useCallback(
    (entry: HistoryEntry) => {
      updateHistory([entry, ...history].slice(0, 250));
    },
    [history, updateHistory],
  );

  const deleteHistory = useCallback(
    (id: string) => updateHistory(history.filter(item => item.id !== id)),
    [history, updateHistory],
  );

  const clearHistory = useCallback(() => updateHistory([]), [updateHistory]);

  const updateSettings = useCallback((nextSettings: AppSettings) => {
    setSettings(nextSettings);
    saveSettings(nextSettings).catch(() => undefined);
  }, []);

  const reuseCalculation = useCallback((item: HistoryEntry) => {
    setReuseExpression(item.expression);
    setScreen('calculator');
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'bottom', 'left']}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
          {screen === 'calculator' && (
            <CalculatorScreen
              settings={settings}
              initialExpression={reuseExpression}
              onNavigate={setScreen}
              onAddHistory={addHistory}
              onConsumeInitialExpression={() => setReuseExpression(undefined)}
            />
          )}
          {screen === 'history' && (
            <HistoryScreen
              history={history}
              onNavigate={setScreen}
              onDelete={deleteHistory}
              onClear={clearHistory}
              onReuse={reuseCalculation}
            />
          )}
          {screen === 'settings' && (
            <SettingsScreen
              settings={settings}
              historyCount={history.length}
              onNavigate={setScreen}
              onChangeSettings={updateSettings}
              onClearHistory={clearHistory}
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
});

export default App;
