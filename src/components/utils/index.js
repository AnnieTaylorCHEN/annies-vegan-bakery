const CART_KEY = 'AVBcart'

export const calculatePrice = items => {
    return `$${
        items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
    }`
}

// cart to persist data on users' browsers
export const setCart = (value, cartKey = CART_KEY) => {
    if (localStorage) {
        localStorage.setItem(cartKey, JSON.stringify(value))
    }
}

export const getCart = (cartKey = CART_KEY) => {
    if (localStorage && localStorage.getItem(cartKey)){
        return JSON.parse(localStorage.getItem(cartKey))
    }
    return []
}