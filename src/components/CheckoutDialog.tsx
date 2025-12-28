import { useState } from 'react'
import { Check } from '@phosphor-icons/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { CheckoutFormData, CartItem } from '@/lib/types'

interface CheckoutDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CheckoutFormData) => void
  cartItems: CartItem[]
  total: number
}

export function CheckoutDialog({ isOpen, onClose, onSubmit, cartItems, total }: CheckoutDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      setShowSuccess(true)
      
      setTimeout(() => {
        onSubmit(formData)
        setShowSuccess(false)
        setFormData({
          fullName: '',
          email: '',
          address: '',
          city: '',
          zipCode: '',
          country: ''
        })
        onClose()
      }, 2000)
    }, 1500)
  }

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent animate-in zoom-in">
              <Check size={32} weight="bold" className="text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order is being processed.
            </p>
            <div className="w-full rounded-lg border bg-muted/50 p-4 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items:</span>
                <span className="font-medium">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-bold text-primary">${total.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t text-xs text-muted-foreground">
                Shipping to: {formData.address}, {formData.city}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Checkout</DialogTitle>
          <DialogDescription>
            Complete your order by providing your shipping details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="New York"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                placeholder="10001"
                value={formData.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="United States"
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="space-y-1 text-sm">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-2 font-semibold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
