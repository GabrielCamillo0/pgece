import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[#08000E] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-brand-red to-brand-orange text-white shadow-[0_0_24px_rgba(255,72,32,0.40)] hover:shadow-[0_0_36px_rgba(255,72,32,0.60)] hover:opacity-90",
        ghost:
          "border border-white/15 bg-white/5 text-white/85 backdrop-blur hover:bg-white/10 hover:text-white",
        white:
          "bg-white text-black hover:opacity-90",
        outline:
          "border border-brand-red/50 bg-transparent text-brand-red hover:bg-brand-red/10 hover:border-brand-red/70 transition-colors duration-200",
        link:
          "text-white/75 underline-offset-4 hover:underline hover:text-white",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "px-4 py-2.5 text-xs",
        lg: "px-7 py-3.5 text-base min-h-[48px]",
        icon: "h-11 w-11 min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
