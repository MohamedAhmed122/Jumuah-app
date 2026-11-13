import type { StyleProp, ViewStyle } from 'react-native';
import type { TFunction } from 'i18next';
import type { ThemeName } from '@constants/Colors';
import type { AppLanguage } from '@src/i18n/languages';
import type { ThemePreference } from '@src/theme';

export interface StepProps {
  t: TFunction;
}

export interface ActionStepProps extends StepProps {
  onAllow: () => void;
  onSkip: () => void;
}

export interface DoneStepProps extends StepProps {
  checkStyle: StyleProp<ViewStyle>;
  nextLabel: string;
  nextTime: string;
  onEnter: () => void;
}

export interface ThemeStepProps extends StepProps {
  selected: ThemePreference;
  onSelect: (theme: ThemeName) => void;
  onNext: () => void;
}

export interface LanguageStepProps extends StepProps {
  selected: AppLanguage;
  onSelect: (language: AppLanguage) => void;
  onNext: () => void;
}
