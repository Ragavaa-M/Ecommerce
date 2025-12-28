import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Header } from './components/Header'
import { Login } from './components/Login'
import { ProductCard } from './components/ProductCard'
import { Cart } from './components/Cart'
import { CheckoutDialog } from './components/CheckoutDialog'
import { authApi, productsApi, cartApi, ordersApi } from './lib/api'
import type { User, CartItem, Product, CheckoutFormData } from './lib/types'

function App() {
  const [user, setUser] = useKV<User | null>('user', null)
  const [products, setProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load products from backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productsApi.getAll()
        setProducts(data.products)
      } catch (error) {
        console.error('Failed to load products:', error)
        toast.error('Failed to load products')
      }
    }
    loadProducts()
  }, [])

  // Load cart from backend when user logs in
  useEffect(() => {
    if (user?.id) {
      const loadCart = async () => {
        try {
          const data = await cartApi.get(user.id)
          setCartItems(data.items)
        } catch (error) {
          console.error('Failed to load cart:', error)
        }
      }
      loadCart()
    } else {
      setCartItems([])
    }
  }, [user?.id])

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await authApi.login(email, password)
      setUser({ ...response.user, id: response.user.id })
      toast.success(`Welcome back, ${response.user.name}!`)
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      const response = await authApi.register(email, password, name)
      setUser({ ...response.user, id: response.user.id })
      toast.success(response.message || `Welcome to ShopHub, ${response.user.name}!`)
    } catch (error: any) {
      toast.error(error.message || 'Signup failed')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await authApi.logout()
      setUser(null)
      setCartItems([])
      toast.info('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
      // Still logout on frontend even if backend fails
      setUser(null)
      setCartItems([])
    }
  }

  const handleAddToCart = async (product: Product) => {
    if (!user?.id) return

    try {
      const response = await cartApi.addItem(user.id, product.id, 1)
      setCartItems(response.cart.items)

      const existingItem = cartItems.find(item => item.product.id === product.id)
      if (existingItem) {
        toast.success('Quantity updated in cart')
      } else {
        toast.success('Added to cart')
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add to cart')
    }
  }

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (!user?.id) return

    try {
      const response = await cartApi.updateQuantity(user.id, productId, quantity)
      setCartItems(response.cart.items)
    } catch (error: any) {
      toast.error(error.message || 'Failed to update quantity')
    }
  }

  const handleRemoveItem = async (productId: string) => {
    if (!user?.id) return

    try {
      const response = await cartApi.removeItem(user.id, productId)
      setCartItems(response.cart.items)
      toast.info('Item removed from cart')
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove item')
    }
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  const handleCheckoutSubmit = async (data: CheckoutFormData) => {
    if (!user?.id) return

    try {
      const response = await ordersApi.create(user.id, data)
      setCartItems([])
      toast.success('Order placed successfully!')
      console.log('Order created:', response.order)
    } catch (error: any) {
      toast.error(error.message || 'Failed to place order')
      throw error
    }
  }

  const subtotal = (cartItems || []).reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  if (!user) {
    return <Login onLogin={handleLogin} onSignup={handleSignup} loading={loading} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItems={cartItems || []}
        onCartClick={() => setIsCartOpen(true)}
        onLogout={handleLogout}
        userName={user.name}
      />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Our Products</h2>
          <p className="text-muted-foreground">
            Discover our curated collection of premium items
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      <AnimatePresence>
        {isCartOpen && (
          <Cart
            items={cartItems || []}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            onClose={() => setIsCartOpen(false)}
          />
        )}
      </AnimatePresence>

      <CheckoutDialog
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleCheckoutSubmit}
        cartItems={cartItems || []}
        total={total}
      />
    </div>
  )
}

export default App