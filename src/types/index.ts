export type HistoryEntry = {
    id: string;
    expression: string;
    result: string;
    createdAt: number;
};

export type AppSettings = {
    soundEnabled: boolean;
    hapticEnabled: boolean;
};

export type AppScreen = 'calculator' | 'history' | 'settings';
