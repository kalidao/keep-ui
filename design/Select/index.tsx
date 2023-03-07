import * as React from 'react'

import { IconCheck, IconChevronDown } from '@kalidao/reality'
import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '@design/utils'

import * as styles from './styles.css'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ className, ...props }, ref) => <SelectPrimitive.Value ref={ref} className={styles.value} {...props} />)

SelectValue.displayName = SelectPrimitive.Value.displayName

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref} className={styles.trigger} {...props}>
    {children}
    <IconChevronDown className={styles.triggerIcon} />
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content ref={ref} className={styles.content} {...props}>
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => <SelectPrimitive.Label ref={ref} className={styles.label} {...props} />)
SelectLabel.displayName = SelectPrimitive.Label.displayName

type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  hideIndicator?: boolean
}

const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
  ({ className, children, hideIndicator, ...props }, ref) => (
    <SelectPrimitive.Item ref={ref} className={cn(styles.item, className)} {...props}>
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          {hideIndicator ? null : <IconCheck className={styles.check} />}
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  ),
)

SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => <SelectPrimitive.Separator ref={ref} className={styles.separator} {...props} />)
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator }
