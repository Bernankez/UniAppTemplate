import theme from './theme'

export default {
  colors: {
    background: theme.background,
    foreground: theme.foreground,
    card: {
      DEFAULT: theme.card,
      foreground: theme.cardForeground,
    },
    primary: {
      DEFAULT: theme.primary,
      foreground: theme.primaryForeground,
    },
    base: {
      DEFAULT: theme.base,
      foreground: theme.baseForeground,
    },
    accent: {
      DEFAULT: theme.accent,
      foreground: theme.accentForeground,
    },
    muted: {
      DEFAULT: theme.muted,
      foreground: theme.mutedForeground,
    },
    info: {
      DEFAULT: theme.info,
      foreground: theme.infoForeground,
    },
    success: {
      DEFAULT: theme.success,
      foreground: theme.successForeground,
    },
    warning: {
      DEFAULT: theme.warning,
      foreground: theme.warningForeground,
    },
    error: {
      DEFAULT: theme.error,
      foreground: theme.errorForeground,
    },
    border: {
      DEFAULT: theme.border,
    },
    divider: {
      DEFAULT: theme.divider,
    },
  },
  borderRadius: {
    sm: theme.borderRadius.sm,
    md: theme.borderRadius.md,
    lg: theme.borderRadius.lg,
  },
}
