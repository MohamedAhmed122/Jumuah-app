import type { StyleProp, ViewStyle } from 'react-native';
import type { TFunction } from 'i18next';
import type { AppLanguage } from '@src/i18n/languages';

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

export interface LanguageStepProps extends StepProps {
  selected: AppLanguage;
  onSelect: (language: AppLanguage) => void;
  onNext: () => void;
}
