import { Form, Head } from '@inertiajs/react';
import { Fingerprint } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useThemeMode } from '@/hooks/use-theme-mode';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { getPasswordStrength } from '@/utils/password-strength';

export default function Login({ status, canResetPassword, canRegister }) {
    const [password, setPassword] = useState('');
    const [biometric, setBiometric] = useState(false);
    const strength = getPasswordStrength(password);

    const glow =
        strength.label === 'weak'
            ? 'focus:ring-red-500/30'
            : strength.label === 'medium'
              ? 'focus:ring-amber-500/30'
              : 'focus:ring-green-500/30';
    const mode = useThemeMode();
    const isDark = mode === 'dark';

    return (
        <AuthLayout title="Welcome back" description="Sign in to your account">
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        {/* EMAIL */}
                        <div className="grid gap-2">
                            <Label className="text-sm opacity-80">Email</Label>

                            <Input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                className="h-11 rounded-xl border border-white/20 bg-white/10 shadow-inner backdrop-blur-md transition focus:ring-2 focus:ring-white/20"
                            />

                            <InputError message={errors.email} />
                        </div>

                        {/* PASSWORD */}
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label className="text-sm text-white/80">
                                    Password
                                </Label>
                                {canResetPassword && (
                                    <TextLink
                                        href={request()}
                                        className="ml-auto text-sm text-white/60 transition hover:text-white"
                                    >
                                        Forgot Password?
                                    </TextLink>
                                )}
                            </div>

                            <div className="relative">
                                <div
                                    className={`absolute -inset-1 rounded-xl opacity-40 blur-xl transition ${strength.label === 'weak' && 'bg-red-500'} ${strength.label === 'medium' && 'bg-amber-500'} ${strength.label === 'strong' && 'bg-green-500'} `}
                                />

                                <PasswordInput
                                    name="password"
                                    value={password}
                                    onChange={(e: any) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className={`relative h-11 rounded-xl border border-white/20 bg-white/10 shadow-inner backdrop-blur-md ${glow} `}
                                />
                            </div>

                            {/* strength bar */}
                            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                                <div
                                    className={`h-full transition-all duration-300 ${strength.label === 'weak' && 'w-1/3 bg-red-500'} ${strength.label === 'medium' && 'w-2/3 bg-amber-500'} ${strength.label === 'strong' && 'w-full bg-green-500'} `}
                                />
                            </div>

                            <InputError message={errors.password} />
                        </div>

                        {/* REMEMBER */}
                        <div className="flex items-center space-x-3">
                            <Checkbox className="border-white/30 bg-white/10" />
                            <Label className="text-sm opacity-70">
                                Remember me
                            </Label>
                        </div>

                        {/* BIOMETRIC TOGGLE */}
                        <button
                            type="button"
                            onClick={() => setBiometric(!biometric)}
                            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2 text-sm opacity-70 shadow-inner transition hover:opacity-100"
                        >
                            <Fingerprint className="size-4" />
                            {biometric
                                ? 'Biometric enabled'
                                : 'Use biometric login'}
                        </button>

                        {/* SUBMIT */}
                        <Button
                            disabled={processing}
                            className="mt-2 w-full rounded-xl bg-white font-medium text-black shadow-lg transition hover:scale-[1.01]"
                        >
                            {processing && <Spinner />}
                            Log in
                        </Button>

                        {/* REGISTER */}
                        {canRegister && (
                            <div className="text-center text-sm opacity-70">
                                Don’t have an account?{' '}
                                <TextLink href={register()}>Sign up</TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-4 text-center text-sm text-green-400">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
