# Planning Guide

A streamlined e-commerce demonstration platform that showcases the complete shopping journey from authentication through checkout with realistic product browsing, cart management, and order completion.

**Experience Qualities**:
1. **Trustworthy** - Clean, professional design that instills confidence in the shopping experience through clear pricing, secure-feeling authentication, and transparent checkout process.
2. **Effortless** - Intuitive navigation with minimal friction between browsing, adding to cart, and completing purchase with visible progress indicators.
3. **Delightful** - Subtle animations and responsive feedback that make interactions feel polished and satisfying without overwhelming the core shopping experience.

**Complexity Level**: Light Application (multiple features with basic state)
  - Manages authentication state, product catalog, shopping cart, and checkout flow with persistent cart data across sessions.

## Essential Features

### Dummy Authentication
- **Functionality**: Simple login form with predefined credentials displayed on screen
- **Purpose**: Demonstrates authentication flow without backend complexity, gates access to shopping features
- **Trigger**: User lands on app or clicks logout
- **Progression**: View login screen with credentials → Enter email/password → Validate → Redirect to products page
- **Success criteria**: Users can log in with displayed credentials, session persists on refresh, logout returns to login screen

### Product Catalog
- **Functionality**: Grid display of products with images, names, prices, and add-to-cart buttons
- **Purpose**: Browse available items with clear visual hierarchy and purchasing options
- **Trigger**: Successful login or navigation to products page
- **Progression**: View product grid → Read details → Click add to cart → See cart badge update → Continue shopping or go to cart
- **Success criteria**: Products display in responsive grid, add-to-cart provides immediate feedback, cart count updates in real-time

### Shopping Cart
- **Functionality**: Review selected items, adjust quantities, see totals, remove items
- **Purpose**: Manage purchase decisions before committing to checkout
- **Trigger**: Click cart icon in header showing item count
- **Progression**: Click cart → View items with images/details → Adjust quantities → See updated total → Proceed to checkout or continue shopping
- **Success criteria**: Cart persists across sessions, quantity changes update totals instantly, empty cart shows helpful message

### Checkout Flow
- **Functionality**: Simple address form with order submission
- **Purpose**: Collect delivery information and confirm purchase
- **Trigger**: Click checkout button from cart
- **Progression**: Click checkout → Fill address form → Submit → See success dialog with order summary → Return to products
- **Success criteria**: Form validates required fields, success dialog appears with order details, cart clears after successful order

## Edge Case Handling

- **Empty Cart Checkout**: Disable checkout button when cart is empty, show helpful "Your cart is empty" message
- **Invalid Login**: Show clear error message for incorrect credentials without revealing which field is wrong
- **Session Expiration**: Maintain login state in KV storage to persist across page refreshes
- **Zero Quantity**: Prevent quantities from going below 1, provide remove button for deletion
- **Network Simulation**: Artificial loading states during login and checkout to simulate real-world behavior

## Design Direction

The design should feel modern, trustworthy, and professional - evoking the polish of established e-commerce platforms while maintaining approachability. A minimal interface with generous whitespace serves the product-focused purpose, allowing product imagery to shine while keeping navigation and actions crystal clear.

## Color Selection

Complementary (opposite colors) - Using a sophisticated purple as the primary brand color paired with warm accent tones to create visual interest while maintaining professionalism and trust associated with e-commerce.

- **Primary Color**: Deep Purple (oklch(0.45 0.15 300)) - Communicates sophistication, premium quality, and modernity for primary actions and branding
- **Secondary Colors**: Light Purple/Lavender (oklch(0.96 0.02 300)) for subtle backgrounds and hover states
- **Accent Color**: Warm Coral (oklch(0.68 0.14 25)) - Draws attention to cart badges, success states, and promotional elements
- **Foreground/Background Pairings**:
  - Background (White oklch(1 0 0)): Dark text oklch(0.2 0 0) - Ratio 16.1:1 ✓
  - Card (White oklch(1 0 0)): Dark text oklch(0.2 0 0) - Ratio 16.1:1 ✓
  - Primary (Deep Purple oklch(0.45 0.15 300)): White text oklch(1 0 0) - Ratio 8.2:1 ✓
  - Secondary (Light Purple oklch(0.96 0.02 300)): Dark text oklch(0.2 0 0) - Ratio 15.8:1 ✓
  - Accent (Warm Coral oklch(0.68 0.14 25)): White text oklch(1 0 0) - Ratio 4.9:1 ✓
  - Muted (Light Gray oklch(0.96 0 0)): Muted text oklch(0.5 0 0) - Ratio 7.8:1 ✓

## Font Selection

Typography should convey clarity and modernity with excellent readability for product information, pricing, and form inputs - using Inter for its clean geometric forms and professional appearance.

- **Typographic Hierarchy**:
  - H1 (Page Titles): Inter Bold/32px/tight letter spacing (-0.02em)
  - H2 (Section Headers): Inter Semibold/24px/tight letter spacing (-0.01em)
  - H3 (Product Names): Inter Medium/18px/normal letter spacing
  - Body (Descriptions, Form Labels): Inter Regular/16px/relaxed line height (1.6)
  - Small (Prices, Metadata): Inter Medium/14px/normal spacing
  - Button Text: Inter Semibold/15px/normal spacing

## Animations

Animations should feel responsive and purposeful - providing immediate feedback for interactions while maintaining a sense of polish through smooth state transitions and subtle micro-interactions that don't delay user actions.

- **Purposeful Meaning**: Quick scale transforms on button presses communicate tactile response, cart badge animations draw attention to successful additions, smooth page transitions maintain spatial context
- **Hierarchy of Movement**: Product cards subtly lift on hover (most frequent interaction), cart icon bounces on item addition (important feedback), checkout success dialog scales in with backdrop (critical moment of delight)

## Component Selection

- **Components**:
  - `Card` for product displays with subtle borders and shadows on hover
  - `Button` for primary actions (Add to Cart, Checkout, Login) with variant styling
  - `Input` for login form and checkout address fields with clear labels
  - `Badge` for cart item count with custom coral accent color
  - `Dialog` for checkout success confirmation with order summary
  - `Separator` to divide cart items and sections visually
  - `ScrollArea` for cart dropdown if many items
  - `Label` for form field associations

- **Customizations**:
  - Product card component with image, title, price, and add button in consistent layout
  - Header component with logo, navigation, and cart badge
  - Cart item component with thumbnail, details, quantity controls, and remove button
  - Custom login card with credentials display and form

- **States**:
  - Buttons: Default with purple background, hover with deeper shade, active with scale, disabled with reduced opacity
  - Inputs: Default with border, focus with purple ring, error with red border, filled with subtle background
  - Product cards: Default flat, hover with shadow and slight lift, active with scale down
  - Cart badge: Pulse animation when count increases, smooth number transition

- **Icon Selection**:
  - `ShoppingCart` for cart navigation and empty states
  - `Plus/Minus` for quantity adjustments
  - `Trash` for item removal
  - `Check` for success confirmations
  - `User` for login/profile
  - `Package` for orders/products
  - `SignOut` for logout

- **Spacing**:
  - Container padding: p-6 (24px) on mobile, p-8 (32px) on desktop
  - Card gaps: gap-6 (24px) between product cards
  - Form spacing: space-y-4 (16px) between form fields
  - Section margins: mb-8 (32px) between major sections
  - Button padding: px-6 py-2.5 for primary actions

- **Mobile**:
  - Product grid: 1 column mobile → 2 columns tablet → 3-4 columns desktop
  - Header: Stacked logo/cart on small screens → horizontal layout on desktop
  - Cart: Full-screen overlay on mobile → dropdown panel on desktop
  - Form: Full-width inputs with larger touch targets (min 44px height)
  - Navigation: Simplified mobile menu with prominent cart access
