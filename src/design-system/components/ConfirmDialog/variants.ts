import { tv, type VariantProps } from 'tailwind-variants';

export const confirmDialogVariants = tv({
  slots: {
    badge: 'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
    confirm: '',
  },
  variants: {
    tone: {
      default: { badge: 'bg-sage-green/20' },
      danger: { badge: 'bg-red-500/10' },
    },
  },
  defaultVariants: { tone: 'default' },
});

export type ConfirmDialogVariants = VariantProps<typeof confirmDialogVariants>;

export interface ConfirmDialogProps extends ConfirmDialogVariants {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: string;
  /** Shown on the confirm button while `onConfirm` is pending. */
  pendingLabel?: string;
  cancelLabel?: string;
  /** May return a promise; the dialog stays open and locked until it settles, then closes. */
  onConfirm: () => void | Promise<void>;
}
