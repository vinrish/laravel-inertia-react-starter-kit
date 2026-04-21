import { useThemeMode } from '@/hooks/use-theme-mode';
import AuthLayoutTemplate from '@/layouts/auth/auth-split-layout';

export default function AuthLayout({
    children,
    title,
    description,
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    const mode = useThemeMode();
    const isDark = mode === 'dark';

    return (
        <AuthLayoutTemplate title={title} description={description}>
            {/* 🌈 BACKGROUND LAYERS */}
            <div className="absolute inset-0 overflow-hidden">
                {/* gradient base */}
                <div
                    className={`absolute inset-0 transition-all duration-700 ${
                        isDark
                            ? 'bg-gradient-to-br from-slate-950 via-indigo-950 to-black'
                            : 'bg-gradient-to-br from-blue-50 via-white to-rose-50'
                    } `}
                />

                {/* 🌌 floating orbs */}
                <div className="absolute -top-32 -left-32 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-96 w-96 animate-pulse rounded-full bg-rose-500/20 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

                {/* 🖼 optional subtle image overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_60%)] opacity-20" />
            </div>

            {/* 🪟 GLASS CARD */}
            <div
                className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl transition-all duration-500"
            >
                {/* Title */}
                <div className="mb-6 space-y-1 text-center">
                    <h1 className="text-2xl font-semibold text-white/90">
                        {title}
                    </h1>
                    <p className="text-sm text-white/60">{description}</p>
                </div>

                {children}
            </div>
        </AuthLayoutTemplate>
    );
}
