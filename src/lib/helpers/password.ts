import type { FieldValues, Path, RegisterOptions } from 'react-hook-form';

export const PASSWORD_HINT =
  'Must be at least 8 characters with uppercase, lowercase, and numbers';

/** Checks a new password mixes uppercase, lowercase and numbers */
export function validatePasswordStrength(value: string): true | string {
  return (
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value) ||
    'Password must contain uppercase, lowercase, and numbers'
  );
}

/** Rules for choosing a new password, shared by signup and password change */
export function newPasswordRules<
  T extends FieldValues,
  N extends Path<T> = Path<T>,
>(): RegisterOptions<T, N> {
  return {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
    validate: validatePasswordStrength,
  } as RegisterOptions<T, N>;
}
