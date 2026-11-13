import { createThemedStyles } from '@src/theme';

export const themedStyles = createThemedStyles((colors) => ({
  button: {
    position: 'absolute', right: 18, bottom: 18, width: 58, height: 58,
    alignItems: 'center', justifyContent: 'center', borderRadius: 29,
    backgroundColor: colors.accent, borderWidth: 3, borderColor: colors.background,
    shadowColor: '#000000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3,
    shadowRadius: 7, elevation: 8,
  },
}));
