// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const appLightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1565c0",
            light: "#5e92f3",
            dark: "#003c8f",
        },
        secondary: {
            main: "#00bcd4",
            light: "#62efff",
            dark: "#008ba3",
        },
        success: {
            main: "#2e7d32", // финансовый зелёный
            light: "#60ad5e",
            dark: "#005005",
        },
        info: {
            main: "#0288d1",
            light: "#4fc3f7",
            dark: "#01579b",
        },
        warning: {
            main: "#ff9100",
            light: "#ffc246",
            dark: "#c56200",
        },
        error: {
            main: "#d32f2f",
            light: "#ef5350",
            dark: "#c62828",
            contrastText: "#ffffff",
        },
        background: {
            default: "#f8f9fa",
            paper: "#ffffff",
        },
        text: {
            primary: "#0f172a",
            secondary: "#6b7280",
        },
    },
    shape: {
        borderRadius: 6,
    },
    typography: {
        fontFamily:
            'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        h1: { fontWeight: 700, fontSize: "2.4rem" },
        h2: { fontWeight: 600, fontSize: "1.8rem" },
        h3: { fontWeight: 600, fontSize: "1.5rem" },
        body1: { fontSize: "0.95rem" },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                disableRipple: false,
            },
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    textTransform: "none",
                    borderRadius: theme.shape.borderRadius,
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    padding: "8px 16px",
                    minWidth: "64px",
                    transition: theme.transitions.create(
                        ["background-color", "box-shadow", "border-color", "transform"],
                        {
                            duration: theme.transitions.duration.short,
                        }
                    ),
                    // Состояния для всех вариантов
                    "&:hover": {
                        transform: "translateY(-1px)",
                    },
                    "&:active": {
                        transform: "translateY(0)",
                    },
                    "&:focus-visible": {
                        outline: `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: "2px",
                    },
                    "&.Mui-disabled": {
                        opacity: 0.5,
                        cursor: "not-allowed",
                    },
                    // Вариант: contained (default)
                    ...(ownerState.variant === "contained" && {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
                        "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.16)",
                            transform: "translateY(-1px)",
                        },
                        "&:active": {
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.12)",
                            transform: "translateY(0)",
                        },
                    }),
                    // Вариант: outlined (outline)
                    ...(ownerState.variant === "outlined" && {
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: "transparent",
                        color: theme.palette.text.primary,
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                            borderColor: theme.palette.primary.main,
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
                            transform: "translateY(-1px)",
                        },
                        "&:active": {
                            backgroundColor: theme.palette.action.selected,
                            transform: "translateY(0)",
                        },
                    }),
                    // Вариант: text (ghost)
                    ...(ownerState.variant === "text" && {
                        backgroundColor: "transparent",
                        color: theme.palette.text.primary,
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                            boxShadow: "none",
                        },
                        "&:active": {
                            backgroundColor: theme.palette.action.selected,
                        },
                    }),
                    // Размеры
                    ...(ownerState.size === "small" && {
                        padding: "4px 12px",
                        fontSize: "0.8125rem",
                        minWidth: "48px",
                    }),
                    ...(ownerState.size === "large" && {
                        padding: "12px 24px",
                        fontSize: "0.9375rem",
                        minWidth: "80px",
                    }),
                    // Цвета
                    ...(ownerState.color === "error" && {
                        ...(ownerState.variant === "contained" && {
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.error.contrastText,
                            "&:hover": {
                                backgroundColor: theme.palette.error.dark,
                            },
                        }),
                        ...(ownerState.variant === "outlined" && {
                            borderColor: theme.palette.error.main,
                            color: theme.palette.error.main,
                            "&:hover": {
                                borderColor: theme.palette.error.dark,
                                backgroundColor: theme.palette.error.light + "15",
                            },
                        }),
                    }),
                    ...(ownerState.color === "success" && {
                        ...(ownerState.variant === "contained" && {
                            backgroundColor: theme.palette.success.main,
                            color: theme.palette.success.contrastText,
                            "&:hover": {
                                backgroundColor: theme.palette.success.dark,
                            },
                        }),
                    }),
                }),
            },
        },
        MuiCard: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.shape.borderRadius,
                    border: "1px solid rgba(11, 16, 28, 0.06)",
                    padding: "0px 10px",
                    boxShadow: "0 10px 25px rgba(15,23,42,0.06)",
                    backgroundImage:
                        "linear-gradient(135deg, rgba(248,250,252,1), rgba(241,245,249,0.9))",
                    transition: "transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 18px 40px rgba(15,23,42,0.12)",
                        borderColor: "rgba(37,99,235,0.35)",
                    },
                }),
            },
        },
        MuiAppBar: {
            defaultProps: {
                color: "primary",
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backdropFilter: "blur(10px)",
                    borderBottom: "1px solid rgba(148,163,184,0.4)",
                    backgroundImage:
                        "linear-gradient(90deg, #c5e0ffeb, #c5e0ffeb)",
                        
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    minHeight: 64,
                    paddingInline: 24,
                },
            },
        },
    },
});

export const appDarkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",
            light: "#e3f2fd",
            dark: "#42a5f5",
        },
        secondary: {
            main: "#4dd0e1",
            light: "#b2ebf2",
            dark: "#0097a7",
        },
        success: {
            main: "#4ade80",
            light: "#86efac",
            dark: "#16a34a",
        },
        info: {
            main: "#38bdf8",
            light: "#7dd3fc",
            dark: "#0ea5e9",
        },
        warning: {
            main: "#fb923c",
            light: "#fed7aa",
            dark: "#ea580c",
        },
        error: {
            main: "#ef4444",
            light: "#f87171",
            dark: "#dc2626",
            contrastText: "#ffffff",
        },
        background: {
            default: "#020617",
            paper: "#020617",
        },
        text: {
            primary: "#e5e7eb",
            secondary: "#9ca3af",
        },
    },
    shape: {
        borderRadius: 6,
    },
    typography: {
        fontFamily:
            'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        h1: { fontWeight: 700, fontSize: "2.4rem" },
        h2: { fontWeight: 600, fontSize: "1.8rem" },
        h3: { fontWeight: 600, fontSize: "1.5rem" },
        body1: { fontSize: "0.95rem" },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                disableRipple: false,
            },
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    textTransform: "none",
                    borderRadius: theme.shape.borderRadius,
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    padding: "8px 16px",
                    minWidth: "64px",
                    transition: theme.transitions.create(
                        ["background-color", "box-shadow", "border-color", "transform"],
                        {
                            duration: theme.transitions.duration.short,
                        }
                    ),
                    // Состояния для всех вариантов
                    "&:hover": {
                        transform: "translateY(-1px)",
                    },
                    "&:active": {
                        transform: "translateY(0)",
                    },
                    "&:focus-visible": {
                        outline: `2px solid ${theme.palette.primary.light}`,
                        outlineOffset: "2px",
                    },
                    "&.Mui-disabled": {
                        opacity: 0.5,
                        cursor: "not-allowed",
                    },
                    // Вариант: contained (default)
                    ...(ownerState.variant === "contained" && {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                        "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                            transform: "translateY(-1px)",
                        },
                        "&:active": {
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                            transform: "translateY(0)",
                        },
                    }),
                    // Вариант: outlined (outline)
                    ...(ownerState.variant === "outlined" && {
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: "transparent",
                        color: theme.palette.text.primary,
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                            borderColor: theme.palette.primary.light,
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                            transform: "translateY(-1px)",
                        },
                        "&:active": {
                            backgroundColor: theme.palette.action.selected,
                            transform: "translateY(0)",
                        },
                    }),
                    // Вариант: text (ghost)
                    ...(ownerState.variant === "text" && {
                        backgroundColor: "transparent",
                        color: theme.palette.text.primary,
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                            boxShadow: "none",
                        },
                        "&:active": {
                            backgroundColor: theme.palette.action.selected,
                        },
                    }),
                    // Размеры
                    ...(ownerState.size === "small" && {
                        padding: "4px 12px",
                        fontSize: "0.8125rem",
                        minWidth: "48px",
                    }),
                    ...(ownerState.size === "large" && {
                        padding: "12px 24px",
                        fontSize: "0.9375rem",
                        minWidth: "80px",
                    }),
                    // Цвета
                    ...(ownerState.color === "error" && {
                        ...(ownerState.variant === "contained" && {
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.error.contrastText,
                            "&:hover": {
                                backgroundColor: theme.palette.error.dark,
                            },
                        }),
                        ...(ownerState.variant === "outlined" && {
                            borderColor: theme.palette.error.main,
                            color: theme.palette.error.main,
                            "&:hover": {
                                borderColor: theme.palette.error.dark,
                                backgroundColor: theme.palette.error.light + "15",
                            },
                        }),
                    }),
                    ...(ownerState.color === "success" && {
                        ...(ownerState.variant === "contained" && {
                            backgroundColor: theme.palette.success.main,
                            color: theme.palette.success.contrastText,
                            "&:hover": {
                                backgroundColor: theme.palette.success.dark,
                            },
                        }),
                    }),
                }),
            },
        },
        MuiCard: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: theme.shape.borderRadius,
                    border: "1px solid rgba(73, 75, 77, 0.35)",
                    padding: "0px 10px",
                    backgroundImage:
                        "radial-gradient(circle at top left, rgba(59,130,246,0.35), transparent 55%), linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))",
                    boxShadow: "0 18px 45px rgba(15,23,42,0.7)",
                    transition: "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 24px 60px rgba(15,23,42,0.9)",
                        borderColor: "rgba(96,165,250,0.7)",
                    },
                }),
            },
        },
        MuiAppBar: {
            defaultProps: {
                color: "primary",
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backdropFilter: "blur(14px)",
                    borderBottom: "1px solid rgba(30,64,175,0.9)",
                    backgroundImage:
                        "linear-gradient(90deg, rgba(15,23,42,0.95), rgba(17,24,39,0.98))",
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    minHeight: 64,
                    paddingInline: 24,
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: (theme: any) => theme.palette.background.default,
                    color: (theme: any) => theme.palette.text.primary,
                },
            },
        },
    },
});

export const getAppTheme = (mode: "light" | "dark") =>
    mode === "dark" ? appDarkTheme : appLightTheme;
