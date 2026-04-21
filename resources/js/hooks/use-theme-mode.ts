import { useEffect, useState } from 'react';

export function useThemeMode() {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        const isDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;
        setMode(isDark ? 'dark' : 'light');

        const listener = (e: MediaQueryListEvent) => {
            setMode(e.matches ? 'dark' : 'light');
        };

        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', listener);

        return () =>
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .removeEventListener('change', listener);
    }, []);

    return mode;
}
