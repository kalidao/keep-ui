import * as React from 'react'

import { IconClose, VisuallyHidden } from '@kalidao/reality'
import * as SheetPrimitive from '@radix-ui/react-dialog'

import { cn } from '@design/utils'

import * as styles from './styles.css'

const Sheet = SheetPrimitive.Root

const SheetTrigger = ({ children, ...props }: SheetPrimitive.DialogTriggerProps) => (
  <SheetPrimitive.Trigger {...props} className={styles.trigger}>
    {children}
  </SheetPrimitive.Trigger>
)

interface SheetPortalProps extends SheetPrimitive.PortalProps {
  position: styles.PortalChildrenVariants
}

const SheetPortal = ({ position, className, children, ...props }: SheetPortalProps) => (
  <SheetPrimitive.Portal {...props}>
    <div className={cn(styles.portalChildren[position], className)}>{children}</div>
  </SheetPrimitive.Portal>
)
SheetPortal.displayName = SheetPrimitive.Portal.displayName

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <SheetPrimitive.Overlay className={cn(styles.sheetOverlay, className)} {...props} ref={ref} />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

export interface DialogContentProps extends SheetPrimitive.DialogContentProps {
  position: 'top' | 'right' | 'bottom' | 'left'
  size: 'base' | 'fit' | 'lg' | 'xl' | 'full'
  onClose: () => void
}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, DialogContentProps>(
  ({ position, size, className, onClose, children, ...props }, ref) => (
    <SheetPortal position={position}>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(
          styles.portalContent({
            position,
            size,
          }),
          className,
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close onClick={onClose} className={styles.portalClose}>
          <IconClose size="4" />
          <VisuallyHidden>Close</VisuallyHidden>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
)
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.header, className)} {...props} />
)

SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(styles.footer, className)} {...props} />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn(styles.title, className)} {...props} />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn(styles.description, className)} {...props} />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
