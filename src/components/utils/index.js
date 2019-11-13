const CART_KEY = 'AVBcart'
const TOKEN_KEY = 'AVBjwt'

export const calculatePrice = items => {
    return `$${
        items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
    }`
}

export const calculateAmount = items => {
    return Number(items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2))
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

export const clearCart = (cartKey = CART_KEY) => {
    if (localStorage) {
        localStorage.removeItem(cartKey)
    }
}

//auth
export const setToken = (value, tokenkey = TOKEN_KEY ) => {
    if (localStorage) {
        localStorage.setItem(tokenkey, JSON.stringify(value))
    }
}

export const getToken = (tokenkey = TOKEN_KEY) => {
    if (localStorage && localStorage.getItem(tokenkey)) {
        return JSON.parse(localStorage.getItem(tokenkey))
    }
    return null
}

export const clearToken = (tokenkey = TOKEN_KEY) => {
    if (localStorage) {
        localStorage.removeItem(tokenkey)
    }
}