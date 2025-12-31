import { useState, useEffect, forwardRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, Mail, Lock, User, Github, Play, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
});

const signupSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

// Floating particles component
function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${10 + Math.random() * 20}s`,
                    }}
                />
            ))}
        </div>
    );
}

// Password strength indicator
function PasswordStrength({ password }: { password: string }) {
    const getStrength = () => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const strength = getStrength();
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
    const glowColors = ['shadow-red-500/50', 'shadow-orange-500/50', 'shadow-yellow-500/50', 'shadow-lime-500/50', 'shadow-green-500/50'];
    const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

    if (!password) return null;

    return (
        <div className="mt-3 space-y-2">
            <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i < strength
                            ? `${colors[strength - 1]} shadow-lg ${glowColors[strength - 1]}`
                            : 'bg-white/10'
                            }`}
                    />
                ))}
            </div>
            <p className={`text-xs font-medium ${colors[strength - 1]?.replace('bg-', 'text-') || 'text-gray-500'}`}>
                {labels[strength - 1] || ''}
            </p>
        </div>
    );
}

// Animated input field component
interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: React.ComponentType<{ className?: string }>;
    error?: string;
    showToggle?: boolean;
    onToggle?: () => void;
    showPassword?: boolean;
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
    ({ icon: Icon, error, showToggle, onToggle, showPassword, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);

        return (
            <div className="relative group">
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-[#E50914]/20 via-purple-500/20 to-blue-500/20 opacity-0 blur-xl transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'group-hover:opacity-50'}`} />
                <div className="relative">
                    <Icon className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 z-10 ${isFocused ? 'text-[#E50914]' : 'text-gray-500'}`} />
                    <input
                        ref={ref}
                        {...props}
                        onFocus={(e) => {
                            setIsFocused(true);
                            props.onFocus?.(e);
                        }}
                        onBlur={(e) => {
                            setIsFocused(false);
                            props.onBlur?.(e);
                        }}
                        className={`w-full pl-14 ${showToggle ? 'pr-14' : 'pr-5'} py-5 bg-white/[0.03] backdrop-blur-xl rounded-2xl text-white placeholder:text-gray-500 border transition-all duration-300 text-base ${isFocused
                            ? 'border-[#E50914]/50 shadow-[0_0_30px_rgba(229,9,20,0.15)] bg-white/[0.06]'
                            : 'border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.05]'
                            } focus:outline-none`}
                        aria-invalid={!!error}
                    />
                    {showToggle && (
                        <button
                            type="button"
                            onClick={onToggle}
                            className={`absolute right-5 top-1/2 -translate-y-1/2 transition-all duration-300 ${isFocused ? 'text-[#E50914]' : 'text-gray-500 hover:text-white'}`}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    )}
                </div>
                {error && (
                    <p className="text-red-400 text-sm mt-2.5 flex items-center gap-2 animate-shake">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

AnimatedInput.displayName = 'AnimatedInput';

export function Login() {
    return <LoginForm />;
}

export function Signup() {
    return <SignupForm />;
}

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login, isLoading } = useAuth();
    const { addToast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const defaultEmail = searchParams.get('email') || '';

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: defaultEmail, password: '', rememberMe: false },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data.email, data.password);
            addToast({ title: 'Welcome back!', type: 'success' });
            navigate('/explore');
        } catch {
            addToast({
                title: 'Authentication failed',
                description: 'Please check your credentials and try again.',
                type: 'error'
            });
        }
    };

    return (
        <AuthLayout mounted={mounted}>
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                    Welcome Back
                </h1>
                <p className="text-gray-400 text-lg">
                    Sign in to continue streaming
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <AnimatedInput
                    icon={Mail}
                    type="email"
                    placeholder="Email address"
                    error={errors.email?.message}
                    aria-label="Email address"
                    {...register('email')}
                />

                <AnimatedInput
                    icon={Lock}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    error={errors.password?.message}
                    showToggle
                    showPassword={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                    aria-label="Password"
                    {...register('password')}
                />

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-3 text-gray-400 cursor-pointer group">
                        <div className="relative">
                            <input
                                {...register('rememberMe')}
                                type="checkbox"
                                className="peer sr-only"
                            />
                            <div className="w-5 h-5 rounded-md border-2 border-gray-600 bg-white/5 peer-checked:bg-[#E50914] peer-checked:border-[#E50914] transition-all duration-300 flex items-center justify-center">
                                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <span className="text-sm group-hover:text-white transition-colors">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-gray-400 hover:text-[#E50914] transition-colors">
                        Forgot password?
                    </a>
                </div>

                <SubmitButton isLoading={isLoading} text="Sign In" loadingText="Signing In..." />
            </form>

            <SocialLogin />

            <div className="mt-10 text-center">
                <p className="text-gray-400">
                    New to Streamix?{' '}
                    <Link to="/signup" className="text-[#E50914] hover:text-[#ff4d58] font-semibold transition-colors hover:underline underline-offset-4">
                        Sign up now
                    </Link>
                </p>
            </div>

            <TermsText />
        </AuthLayout>
    );
}

function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { signup, isLoading } = useAuth();
    const { addToast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const defaultEmail = searchParams.get('email') || '';

    const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: { email: defaultEmail, password: '', confirmPassword: '', name: '' },
    });

    const watchPassword = watch('password');

    const onSubmit = async (data: SignupFormData) => {
        try {
            await signup(data.email, data.password, data.name);
            addToast({ title: 'Account created successfully!', type: 'success' });
            navigate('/explore');
        } catch {
            addToast({
                title: 'Authentication failed',
                description: 'Please check your credentials and try again.',
                type: 'error'
            });
        }
    };

    return (
        <AuthLayout mounted={mounted}>
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                    Get Started
                </h1>
                <p className="text-gray-400 text-lg">
                    Create an account to start watching
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <AnimatedInput
                    icon={User}
                    type="text"
                    placeholder="Full name"
                    error={errors.name?.message}
                    aria-label="Full name"
                    {...register('name')}
                />

                <AnimatedInput
                    icon={Mail}
                    type="email"
                    placeholder="Email address"
                    error={errors.email?.message}
                    aria-label="Email address"
                    {...register('email')}
                />

                <div>
                    <AnimatedInput
                        icon={Lock}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        error={errors.password?.message}
                        showToggle
                        showPassword={showPassword}
                        onToggle={() => setShowPassword(!showPassword)}
                        aria-label="Password"
                        {...register('password')}
                    />
                    <PasswordStrength password={watchPassword || ''} />
                </div>

                <AnimatedInput
                    icon={Lock}
                    type="password"
                    placeholder="Confirm password"
                    error={errors.confirmPassword?.message}
                    aria-label="Confirm password"
                    {...register('confirmPassword')}
                />

                <SubmitButton isLoading={isLoading} text="Create Account" loadingText="Creating Account..." />
            </form>

            <SocialLogin />

            <div className="mt-10 text-center">
                <p className="text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#E50914] hover:text-[#ff4d58] font-semibold transition-colors hover:underline underline-offset-4">
                        Sign in
                    </Link>
                </p>
            </div>

            <TermsText />
        </AuthLayout>
    );
}

// Shared layout component
function AuthLayout({ children, mounted }: { children: React.ReactNode; mounted: boolean }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
            {/* Animated mesh gradient background */}
            <div className="absolute inset-0 auth-gradient-mesh" />

            {/* Floating Orbs with enhanced effects */}
            <div className="orb orb-red w-[500px] h-[500px] -top-64 -left-64" style={{ animationDelay: '0s' }} />
            <div className="orb orb-purple w-[400px] h-[400px] top-1/3 -right-48" style={{ animationDelay: '2s' }} />
            <div className="orb orb-blue w-[350px] h-[350px] -bottom-32 left-1/4" style={{ animationDelay: '4s' }} />
            <div className="orb orb-pink w-[300px] h-[300px] bottom-1/4 right-1/4" style={{ animationDelay: '6s' }} />

            {/* Floating particles */}
            <FloatingParticles />

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 py-8">
                <Link to="/" className="inline-flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#E50914] blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                        <Play className="w-10 h-10 text-[#E50914] fill-current relative" />
                    </div>
                    <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                        STREAM<span className="text-[#E50914]">IX</span>
                    </span>
                </Link>
            </header>

            {/* Form Card */}
            <div
                className={`relative z-10 w-full max-w-[480px] transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
            >
                {/* Card glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#E50914]/30 via-purple-500/20 to-blue-500/30 rounded-[2rem] blur-2xl opacity-50" />

                {/* Main card */}
                <div className="relative bg-black/40 backdrop-blur-2xl rounded-[2rem] p-10 md:p-12 border border-white/[0.08] shadow-2xl">
                    {/* Card inner gradient */}
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />

                    {/* Sparkle decoration */}
                    <div className="absolute -top-3 -right-3">
                        <Sparkles className="w-8 h-8 text-[#E50914] animate-pulse" />
                    </div>

                    <div className="relative">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Submit button component
function SubmitButton({ isLoading, text, loadingText }: { isLoading: boolean; text: string; loadingText: string }) {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="w-full relative group mt-8"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-[#E50914] to-[#ff4d58] rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="relative bg-gradient-to-r from-[#E50914] to-[#B20710] hover:from-[#ff1a25] hover:to-[#E50914] text-white font-semibold py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg shadow-[#E50914]/25 group-hover:shadow-xl group-hover:shadow-[#E50914]/40 group-hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                    <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        {loadingText}
                    </>
                ) : (
                    text
                )}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>
            </div>
        </button>
    );
}

// Social login buttons
function SocialLogin() {
    return (
        <>
            <div className="flex items-center gap-4 my-10">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="text-gray-500 text-sm font-medium">or continue with</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button type="button" className="group relative flex items-center justify-center gap-3 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] rounded-2xl text-gray-300 hover:text-white transition-all duration-300">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="text-sm font-medium relative">Google</span>
                </button>
                <button type="button" className="group relative flex items-center justify-center gap-3 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] rounded-2xl text-gray-300 hover:text-white transition-all duration-300">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Github className="w-5 h-5 transition-transform group-hover:scale-110 relative" />
                    <span className="text-sm font-medium relative">GitHub</span>
                </button>
            </div>
        </>
    );
}

// Terms text
function TermsText() {
    return (
        <p className="mt-8 text-xs text-gray-500 text-center leading-relaxed">
            By continuing, you agree to our{' '}
            <a href="#" className="text-gray-400 hover:text-white transition-colors underline underline-offset-2">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-gray-400 hover:text-white transition-colors underline underline-offset-2">Privacy Policy</a>
        </p>
    );
}
