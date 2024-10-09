import type { ConfigProviderThemeVars } from 'wot-design-uni'
import theme from './theme'

const themeVars: ConfigProviderThemeVars = {
  colorTitle: theme.foreground,
  colorBg: theme.background,
  colorTheme: theme.primary,
  textPrimaryColor: theme.primaryForeground,
  colorInfo: theme.info,
  textInfoColor: theme.infoForeground,
  colorSuccess: theme.success,
  textSuccessColor: theme.successForeground,
  colorWarning: theme.warning,
  textWarningColor: theme.warningForeground,
  colorDanger: theme.error,
  colorBorder: theme.border,
}

export default themeVars
