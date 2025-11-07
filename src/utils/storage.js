// Helper functions untuk localStorage management

export const getProducts = () => {
  const products = localStorage.getItem("products")
  return products ? JSON.parse(products) : []
}

export const setProducts = (products) => {
  localStorage.setItem("products", JSON.stringify(products))
}

export const getCart = () => {
  const cart = localStorage.getItem("cart")
  return cart ? JSON.parse(cart) : []
}

export const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

export const getUsers = () => {
  const users = localStorage.getItem("users")
  return users ? JSON.parse(users) : []
}

export const setUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users))
}

export const getNotifications = () => {
  const notifications = localStorage.getItem("notifications")
  return notifications ? JSON.parse(notifications) : []
}

export const setNotifications = (notifications) => {
  localStorage.setItem("notifications", JSON.stringify(notifications))
}

export const addToCart = (product) => {
  const cart = getCart()
  const existingItem = cart.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  setCart(cart)
  return cart
}

export const removeFromCart = (productId) => {
  const cart = getCart()
  const filtered = cart.filter((item) => item.id !== productId)
  setCart(filtered)
  return filtered
}

export const updateCartQuantity = (productId, quantity) => {
  const cart = getCart()
  const item = cart.find((i) => i.id === productId)

  if (item) {
    if (quantity < 1) {
      return removeFromCart(productId)
    }
    item.quantity = quantity
  }

  setCart(cart)
  return cart
}

export const clearCart = () => {
  setCart([])
}

export const getCartTotal = () => {
  const cart = getCart()
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export const getCartItemCount = () => {
  const cart = getCart()
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}
