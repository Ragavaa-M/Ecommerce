import { Plus } from '@phosphor-icons/react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/types'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-medium text-lg mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
          <p className="text-2xl font-semibold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full"
            size="lg"
          >
            <Plus size={20} className="mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
