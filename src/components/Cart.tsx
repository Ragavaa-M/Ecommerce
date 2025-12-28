import { ShoppingCart, Plus, Minus, Trash, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { CartItem } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onCheckout: () => void
  onClose: () => void
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onCheckout, onClose }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl sm:w-96"
      >
        <Card className="flex h-full flex-col border-0 rounded-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl">Shopping Cart</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={24} />
            </Button>
          </CardHeader>

          {items.length === 0 ? (
            <CardContent className="flex flex-1 flex-col items-center justify-center text-center">
              <ShoppingCart size={64} className="mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add some products to get started
              </p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </CardContent>
          ) : (
            <>
              <ScrollArea className="flex-1 px-6">
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex gap-4"
                      >
                        <div className="h-20 w-20 overflow-hidden rounded-md bg-muted flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 -mt-1"
                              onClick={() => onRemoveItem(item.product.id)}
                            >
                              <Trash size={14} />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            ${item.product.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-auto">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </Button>
                            <span className="ml-auto font-semibold text-sm">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>

              <CardFooter className="flex-col gap-4 border-t pt-4">
                <div className="w-full space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button onClick={onCheckout} size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
