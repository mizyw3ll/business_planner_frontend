"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
    InputAdornment,
    LinearProgress,
    Tabs,
    Tab,
} from "@mui/material";
import { API_ROUTES } from "@/src/lib/apiRoutes";
import api from "@/src/lib/axios";
import { toast } from "sonner";

// Схема для авторизации
const loginSchema = z.object({
    email: z.string().email("Некорректный email"),
    password: z.string().min(4, "Пароль должен содержать минимум 4 символов"),
});

// Схема для регистрации
const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, "Имя пользователя должно содержать минимум 3 символа")
            .regex(/^[a-zA-Z0-9_]+$/, "Только буквы, цифры и подчеркивание"),
        email: z.string().email("Некорректный email"),
        password: z
            .string()
            .min(8, "Пароль должен содержать минимум 8 символов")
            .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
            .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
    });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

type AuthMode = "login" | "register";

interface AuthFormProps {
    initialMode?: AuthMode;
}

// Функция для расчета сложности пароля
function getPasswordStrength(password: string): {
    strength: number;
    label: string;
    color: "error" | "warning" | "success";
} {
    if (!password) {
        return { strength: 0, label: "", color: "error" };
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) {
        return { strength, label: "Слабый", color: "error" };
    } else if (strength <= 4) {
        return { strength, label: "Средний", color: "warning" };
    } else {
        return { strength, label: "Сильный", color: "success" };
    }
}

export default function AuthForm({ initialMode }: AuthFormProps) {
    const pathname = usePathname();
    const [mode, setMode] = useState<AuthMode>(
        initialMode || (pathname?.includes("/register") ? "register" : "login")
    );
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // Сохранение состояния формы при переключении
    const [loginFormData, setLoginFormData] = useState<Partial<LoginFormData>>({});
    const [registerFormData, setRegisterFormData] = useState<Partial<RegisterFormData>>({});

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: loginFormData,
    });

    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: registerFormData,
    });

    // Сохранение данных формы перед переключением
    const handleModeChange = (newMode: AuthMode) => {
        if (mode === "login") {
            const currentValues = loginForm.getValues();
            setLoginFormData(currentValues);
        } else {
            const currentValues = registerForm.getValues();
            setRegisterFormData(currentValues);
        }
        setMode(newMode);
    };

    // Восстановление значений при переключении обратно
    useEffect(() => {
        if (mode === "login" && Object.keys(loginFormData).length > 0) {
            loginForm.reset(loginFormData);
        } else if (mode === "register" && Object.keys(registerFormData).length > 0) {
            registerForm.reset(registerFormData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    const onLoginSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.ok) {
                toast.success("Успешный вход!");
                router.push("/dashboard");
            } else {
                toast.error("Неверный email или пароль");
            }
        } catch (error) {
            toast.error("Произошла ошибка при входе");
        } finally {
            setIsLoading(false);
        }
    };

    const onRegisterSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        try {
            const response = await api.post(API_ROUTES.auth.register, {
                username: data.username,
                email: data.email,
                password: data.password,
            });

            if (response.status === 200 || response.status === 201) {
                toast.success("Регистрация успешна! Выполняется вход...");
                // Автоматический вход после регистрации
                const result = await signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                });

                if (result?.ok) {
                    router.push("/dashboard");
                } else {
                    // Если автоматический вход не удался, переключаемся на форму входа
                    setMode("login");
                    loginForm.reset({ email: data.email, password: "" });
                    toast.info("Пожалуйста, войдите в систему");
                }
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.detail || error.response?.data?.message || "Произошла ошибка при регистрации";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const passwordValue = registerForm.watch("password");
    const passwordStrength = getPasswordStrength(passwordValue || "");

    return (
        <Box sx={{ width: "100%", maxWidth: 450, mx: "auto" }}>
            {/* Переключатель режимов */}
            <Tabs
                value={mode === "login" ? 0 : 1}
                onChange={(_, newValue) => handleModeChange(newValue === 0 ? "login" : "register")}
                sx={{ mb: 4 }}
                variant="fullWidth"
            >
                <Tab label="Вход" />
                <Tab label="Регистрация" />
            </Tabs>

            {/* Форма авторизации */}
            {mode === "login" ? (
                <Box
                    component="form"
                    onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                    <TextField
                        id="login-email"
                        label="Email"
                        type="email"
                        placeholder="example@email.com"
                        {...loginForm.register("email")}
                        error={!!loginForm.formState.errors.email}
                        helperText={loginForm.formState.errors.email?.message}
                        fullWidth
                    />

                    <TextField
                        id="login-password"
                        label="Пароль"
                        type={showPassword ? "text" : "password"}
                        placeholder="Введите пароль"
                        {...loginForm.register("password")}
                        error={!!loginForm.formState.errors.password}
                        helperText={loginForm.formState.errors.password?.message}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        size="small"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isLoading}
                        sx={{ py: 1.5 }}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Входим...
                            </>
                        ) : (
                            "Войти"
                        )}
                    </Button>
                </Box>
            ) : (
                <Box
                    component="form"
                    onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                    <TextField
                        id="register-username"
                        label="Имя пользователя"
                        type="text"
                        placeholder="username123"
                        {...registerForm.register("username")}
                        error={!!registerForm.formState.errors.username}
                        helperText={registerForm.formState.errors.username?.message}
                        fullWidth
                    />

                    <TextField
                        id="register-email"
                        label="Email"
                        type="email"
                        placeholder="example@email.com"
                        {...registerForm.register("email")}
                        error={!!registerForm.formState.errors.email}
                        helperText={registerForm.formState.errors.email?.message}
                        fullWidth
                    />

                    <Box>
                        <TextField
                            id="register-password"
                            label="Пароль"
                            type={showPassword ? "text" : "password"}
                            placeholder="Введите пароль"
                            {...registerForm.register("password")}
                            error={!!registerForm.formState.errors.password}
                            helperText={registerForm.formState.errors.password?.message}
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {/* Индикатор сложности пароля */}
                        {passwordValue && (
                            <Box sx={{ mt: 1.5 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(passwordStrength.strength / 6) * 100}
                                        color={passwordStrength.color}
                                        sx={{ flex: 1, height: 6, borderRadius: 3 }}
                                    />
                                    <Typography variant="caption" color="text.secondary" sx={{ minWidth: 60 }}>
                                        {passwordStrength.label}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>

                    <TextField
                        id="register-confirm-password"
                        label="Подтвердите пароль"
                        type={showPassword ? "text" : "password"}
                        placeholder="Повторите пароль"
                        {...registerForm.register("confirmPassword")}
                        error={!!registerForm.formState.errors.confirmPassword}
                        helperText={registerForm.formState.errors.confirmPassword?.message}
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isLoading}
                        sx={{ py: 1.5 }}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Регистрируем...
                            </>
                        ) : (
                            "Зарегистрироваться"
                        )}
                    </Button>
                </Box>
            )}
        </Box>
    );
}
