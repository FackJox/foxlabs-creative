"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimatedDialogProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
};

/**
 * AnimatedDialog component that combines Radix UI's Dialog with Framer Motion animations
 */
export function AnimatedDialog({
  title,
  description,
  children,
  trigger,
  className,
}: AnimatedDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild data-testid="dialog-trigger">
        {trigger}
      </DialogPrimitive.Trigger>

      <AnimatePresence>
        {open ? (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                data-testid="dialog-overlay"
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild>
              <motion.div
                className={cn(
                  "fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-background p-6 shadow-lg",
                  className
                )}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                data-testid="dialog-content"
              >
                <DialogPrimitive.Title className="text-xl font-bold">
                  {title}
                </DialogPrimitive.Title>

                {description && (
                  <DialogPrimitive.Description className="mt-2 text-sm text-gray-500">
                    {description}
                  </DialogPrimitive.Description>
                )}

                <div className="mt-4">{children}</div>

                <DialogPrimitive.Close asChild>
                  <button
                    className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
                    data-testid="dialog-close"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </button>
                </DialogPrimitive.Close>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
} 