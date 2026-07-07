import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-forest)] text-white hover:bg-[var(--color-forest-dark)]",
        outline:
          "border border-[var(--color-cream-dark)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-cream-dark)]/60",
        ghost: "hover:bg-[var(--color-forest-mist)] text-[var(--color-ink)]",
        gold: "bg-[var(--color-gold)] text-[var(--color-forest-dark)] hover:bg-[var(--color-gold-dark)] hover:text-white",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
