import { container } from '@/lib/container'
import { cn } from '@/lib/utils'

export function AdminFooter() {
  return (
    <footer className="border-t">
      <div className={cn(container, 'py-6 text-xs text-muted-foreground')}>
        Admin area
      </div>
    </footer>
  )
}

