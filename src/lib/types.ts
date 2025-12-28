export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  email: string
  name: string
}

export interface CheckoutFormData {
  fullName: string
  email: string
  address: string
  city: string
  zipCode: string
  country: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  shippingAddress: CheckoutFormData
  date: string
}
