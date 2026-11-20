import React, { useEffect, useRef } from 'react';
import { DayPicker, type Matcher } from 'react-day-picker';

interface DateFieldProps {
  label: string;
  value: string; // 'YYYY-MM-DD'
  onSelect: (iso: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: Matcher[];
  /** the whole stay, highlighted in the calendar */
  range: { checkIn: string; checkOut: string };
  /** 'light' = inline search card, 'dark' = floating capsule */
  variant?: 'light' | 'dark';
  /** open below the field, or above it (for the floating capsule at the bottom of the screen) */
  placement?: 'bottom' | 'top';
  /** which edge of the field the calendar lines up with (from sm up) */
  align?: 'left' | 'right';
}

const toDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const toISO = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
const fmt = (iso: string, withWeekday: boolean) =>
  toDate(iso).toLocaleDateString('en-US', {
    ...(withWeekday ? { weekday: 'short' as const } : {}),
    month: 'short',
    day: 'numeric',
  });

/** A booking field that opens its own one-month calendar, highlighting the stay as a range. */
export const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onSelect,
  open,
  onOpenChange,
  disabled,
  range,
  variant = 'light',
  placement = 'bottom',
  align = 'left',
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const dark = variant === 'dark';

  // Bring the whole calendar on screen when it opens below the field
  useEffect(() => {
    if (open && placement === 'bottom' && window.matchMedia('(min-width: 640px)').matches)
      popoverRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [open, placement]);

  // Close on Escape or a tap/click outside
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      onOpenChange(false);
      triggerRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) onOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, onOpenChange]);

  const from = range.checkIn ? toDate(range.checkIn) : undefined;
  const to = range.checkOut ? toDate(range.checkOut) : undefined;

  return (
    <div ref={rootRef} className="relative min-w-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${label}: ${fmt(value, true)}`}
        className={
          dark
            ? `flex items-center gap-2 rounded-full px-3 py-2 transition-colors cursor-pointer ${
                open ? 'bg-white/15' : 'hover:bg-white/10'
              }`
            : `w-full h-14 px-4 flex items-center justify-between gap-3 rounded-2xl border bg-white transition-colors cursor-pointer ${
                open ? 'border-[#111111]' : 'border-[#E6E6E6] hover:border-[#BDBDBD]'
              }`
        }
      >
        <span
          className={
            dark
              ? 'text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45'
              : 'text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B6B6B] whitespace-nowrap'
          }
        >
          {label}
        </span>
        <span className={`font-semibold tabular-nums whitespace-nowrap ${dark ? 'text-sm' : 'text-[15px]'}`}>
          {fmt(value, !dark)}
        </span>
      </button>

      {open && (
        // Phones: bottom sheet over a dimmed page · sm and up: popover anchored to the field
        <div
          aria-hidden="true"
          className="sm:hidden fixed inset-0 z-[70] bg-black/40 animate-fade"
          onClick={() => onOpenChange(false)}
        />
      )}
      {open && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={`Choose ${label.toLowerCase()} date`}
          className={`fixed inset-x-0 bottom-0 z-[71] rounded-t-[28px] px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] sheet-panel sm:absolute sm:inset-x-auto sm:bottom-auto sm:z-50 sm:w-[320px] sm:rounded-3xl sm:p-4 border border-[#E6E6E6] bg-white text-[#111111] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] ${
            placement === 'top' ? 'sm:bottom-full sm:mb-3' : 'sm:top-full sm:mt-2'
          } ${align === 'right' ? 'sm:right-0' : 'sm:left-0'}`}
        >
          <div aria-hidden="true" className="sm:hidden mx-auto mb-3 h-1 w-10 rounded-full bg-[#D9D9D9]" />
          <div className="flex items-center justify-between px-1 pb-3 mb-1 border-b border-[#F0F0F0]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B]">Select {label}</span>
            {range.checkIn && range.checkOut && (
              <span className="text-xs text-[#6B6B6B] tabular-nums">
                {fmt(range.checkIn, false)} → {fmt(range.checkOut, false)}
              </span>
            )}
          </div>
          <DayPicker
            autoFocus
            defaultMonth={toDate(value)}
            startMonth={new Date()}
            disabled={disabled}
            onDayClick={(day, modifiers) => !modifiers.disabled && onSelect(toISO(day))}
            modifiers={{
              range_start: from,
              range_end: to,
              range_middle: from && to ? { after: from, before: to } : undefined,
            }}
            modifiersClassNames={{
              range_start:
                'bg-gradient-to-r from-transparent from-50% to-[#F0F0F0] to-50% [&>button]:bg-[#111111] [&>button]:!text-white [&>button]:font-semibold [&>button]:hover:bg-[#111111]',
              range_end:
                'bg-gradient-to-l from-transparent from-50% to-[#F0F0F0] to-50% [&>button]:bg-[#111111] [&>button]:!text-white [&>button]:font-semibold [&>button]:hover:bg-[#111111]',
              range_middle: 'bg-[#F0F0F0] [&>button]:rounded-none [&>button]:hover:bg-[#E2E2E2]',
            }}
            classNames={{
              root: 'relative',
              months: 'relative',
              month_caption: 'flex h-9 items-center px-1',
              caption_label: 'font-serif-luxury text-lg font-medium',
              nav: 'absolute right-0 top-0 z-10 flex gap-1',
              button_previous:
                'grid h-9 w-9 place-items-center rounded-full border border-[#E6E6E6] transition hover:bg-[#111111] hover:text-white hover:border-[#111111] disabled:pointer-events-none disabled:opacity-30 cursor-pointer',
              button_next:
                'grid h-9 w-9 place-items-center rounded-full border border-[#E6E6E6] transition hover:bg-[#111111] hover:text-white hover:border-[#111111] disabled:pointer-events-none disabled:opacity-30 cursor-pointer',
              chevron: 'h-3.5 w-3.5 fill-current',
              month_grid: 'mt-3 w-full border-collapse',
              weekday: 'h-8 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A3A3A3]',
              day: 'p-0 py-0.5 text-center text-sm',
              // fills the cell up to 44px (40px from sm), so 7 columns fit even on 320px phones
              day_button:
                'mx-auto grid aspect-square w-full max-w-11 sm:max-w-10 place-items-center rounded-full tabular-nums transition hover:bg-[#F0F0F0] disabled:cursor-not-allowed disabled:hover:bg-transparent cursor-pointer',
              today: 'font-bold underline underline-offset-4 decoration-[#BDBDBD]',
              // dimmed, no strikethrough; range ends override this with !text-white (check-in is "disabled" in the checkout calendar)
              disabled: '[&>button]:text-[#CFCFCF]',
              outside: 'invisible',
            }}
          />
        </div>
      )}
    </div>
  );
};
