import { create } from 'zustand';

interface OnboardingState {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 0,
  nextStep: () => set((s) => ({ step: s.step + 1 })),
  prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
  goToStep: (step) => set({ step }),
}));
