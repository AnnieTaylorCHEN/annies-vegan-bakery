import React, { useEffect, useState} from 'react'
import {Box, Heading, Text, Image, Card, Button, Container, Mask, IconButton} from 'gestalt'
import { Link } from 'react-router-dom'

import { calculatePrice, getCart, setCart} from './utils'

const apiUrl = process.env.API_URL || 'http://avb-server.herokuapp.com/graphql'
const imageUrl = process.env.API_URL || 'http://avb-server.herokuapp.com/'

export default function Products({match}) {
    const query = `query {
        product (id: "${match.params.typeId}") {
            _id
            name
            items {
            _id
            name
            description
            image {
                url
            }
            price
            }
        }
    }`

    const opts = {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({query})
    }

    const [products, setProducts] = useState('')
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState(getCart())
    
    useEffect(() => {
        let isSubscribed = true
        fetch(apiUrl, opts)
      .then(res => res.json())
      .then(json => {
          if (isSubscribed) {
             setProducts(json.data.product.name)
            setItems(json.data.product.items) 
          }
        })
      .catch(error => console.error(error))
      return ()=> isSubscribed = false
    },[opts])

    const addToCart = item => {
        const alreadyInCart = cartItems.findIndex(cartItem => cartItem._id === item._id)
        if (alreadyInCart === -1) {
            let updatedItems = cartItems.concat({
                ...item,
                quantity:1
            })
            setCartItems(updatedItems)
            setCart(updatedItems)
        } else {
            let updatedItems = [...cartItems]
            updatedItems[alreadyInCart].quantity += 1
            setCartItems(updatedItems)
            setCart(updatedItems)
        }
    }

    const deleteCartItem = (itemToDelete) => {
        const filteredItems = cartItems.filter(item => item._id !== itemToDelete)
        setCartItems(filteredItems)
        setCart(filteredItems)
    }

    return (
        <div>
        <Container>
            <Box
            marginTop={4}
            display="flex"
            justifyContent="center"
            alignItems="start"
            >
            {/* product items section*/}
           
                <Box 
                display="flex"
                direction="column"
                alignItems="center"
                >
                {/*Items heading*/}
                    <Box margin={2}>
                    <Heading color="blue">{products}</Heading>
                    </Box>
                    {/* Items */}
                    <Box
                        shape='rounded'
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        padding ={4}
                        margin={4}
                        >
                        {items.map( item => (
                            <Card
                            key={item._id}
                            image={
                            <Box width={500} height={500} padding={4}>
                                <Image
                                alt={`${imageUrl}${item.image.name}`}
                                src={`${imageUrl}${item.image.url}`}
                                naturalHeight={1}
                                naturalWidth={1}
                                />
                            </Box>
                            }
                            >
                            <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            direction="column"
                            padding={6}
                            >
                                <Text bold size="xl" >{item.name}</Text>
                                <Text>{item.description}</Text>
                                <Text bold size="xl">$ {item.price}</Text>
                                <Text bold size="xl">
                                    <Button color="blue" text="Add to cart" onClick={() => addToCart(item)}></Button>
                                </Text>
                        </Box>
                        </Card>
                        ))}
                    </Box>
                </Box>
            </Box> 

            {/*user shopping cart*/}
            <Box marginTop={2} marginLeft={8}>
                <Mask shape="rounded" wash>
                            <Box
                            display="flex"
                            direction="column"
                            alignItems="center"
                            padding={2}>
                            {/*cart heading*/}
                            <Heading align="center" size="md">Your Cart</Heading>
                            <Text color="gray" italic>{cartItems.length} items added</Text>
                            {/* cart items */}
                            {cartItems.map(item => (
                                <Box key={item._id} display="flex"
                                alignItems="center">
                                    <Text>
                                        {item.name} x {item.quantity} - ${(item.quantity * item.price).toFixed(2)}
                                    </Text>
                                    <IconButton
                                        accessibilityLabel="delete item"
                                        icon="cancel"
                                        size="sm"
                                        iconColor="red"
                                        onClick={()=> deleteCartItem(item._id)}
                                    ></IconButton>
                                </Box>
                            ))}


                            <Box display="flex" alignItems="center"
                            justifyContent="center"
                            direction="column">
                                <Box margin={2}>
                                    {cartItems.length === 0 && (<Text color="red">Please add some items to your cart</Text>)}
                                    <Text size="lg">Total: {calculatePrice(cartItems)}</Text>
                                    <Text>
                                        <Link to="/checkout">Checkout</Link>
                                    </Text>
                                </Box>

                            </Box>
                            </Box>
                </Mask>
            </Box>
        </Container>
        </div>
    )
}

