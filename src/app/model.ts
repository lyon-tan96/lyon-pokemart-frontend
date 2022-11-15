export interface LoginDetails {
    email: string
    password: string
}

export interface CardDetail {
    image: string
    cardName: string
    price: string
    id: string
}

export interface UserInfo {
    username: string
    email: string
}

export interface Order {
    orderId: string
    username: string
    quantity: number
    orderItems: string[]
    totalPrice: number
}

export interface CartItem {
    cartId: number 
    username: string
    image: string
    cardName: string
    cardId: string
    price: string
    quantity: number
}

export interface OrderDetails {
    orderId: string
    name: string
    contact: number
    address: string
    postal: string
    amount: string
    status: string
    date: string
}

export interface LineItems {
    orderId: string
    image: string
    cardName: string
    card_id: string
    price: string
    quantity: number    
}
