import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { useThemeMode } from '@/hooks/use-theme-mode';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;
    const mode = useThemeMode();
    const isDark = mode === 'dark';

    return (
        <div className="relative grid h-dvh overflow-hidden lg:grid-cols-2">
            {/* 🌌 VisionOS background */}
            <div
                className={`absolute inset-0 transition-all duration-700 ${
                    isDark
                        ? 'bg-gradient-to-br from-slate-950 via-indigo-950 to-black'
                        : 'bg-gradient-to-br from-blue-100 via-white to-rose-100'
                } `}
            />

            {/* floating energy fields */}
            <div className="absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute right-10 bottom-20 h-72 w-72 animate-pulse rounded-full bg-rose-500/20 blur-3xl" />

            {/* LEFT */}
            <div className="relative hidden flex-col justify-between p-10 lg:flex">
                <Link
                    href={home()}
                    className={`flex items-center text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}
                >
                    <AppLogoIcon className="mr-2 size-8" />
                    {name}
                </Link>

                <p
                    className={`max-w-sm text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}
                >
                    Spatial-inspired authentication UI with glass + neumorphism
                    depth layers.
                </p>
            </div>

            {/* RIGHT */}
            <div className="relative flex items-center justify-center p-6">
                {children}
            </div>
        </div>
    );
}
