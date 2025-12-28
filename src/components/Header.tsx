import { ShoppingCart, SignOut, Package } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { CartItem } from '@/lib/types'

interface HeaderProps {
  cartItems: CartItem[]
  onCartClick: () => void
  onLogout: () => void
  userName: string
}

export function Header({ cartItems, onCartClick, onLogout, userName }: HeaderProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Package size={28} weight="duotone" className="text-primary" />
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">ShopHub</h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Welcome, <span className="font-medium text-foreground">{userName}</span>
          </span>
          
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={onCartClick}
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <Badge 
                className="absolute -right-2 -top-2 h-5 min-w-5 items-center justify-center bg-accent p-0 text-xs text-accent-foreground hover:bg-accent"
              >
                {totalItems}
              </Badge>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            title="Logout"
          >
            <SignOut size={20} />
          </Button>
        </div>
      </div>
    </header>
  )
}
