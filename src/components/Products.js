import React, { useEffect, useState} from 'react'
import {Box, Heading, Text, Image, Card, Button, Container, Mask} from 'gestalt'
import { Link } from 'react-router-dom'

const apiUrl = process.env.API_URL || 'http://localhost:1337/graphql'
const imageUrl = process.env.API_URL || 'http://localhost:1337/'

const query = `query {
  product (id: "${window.location.pathname.split('/')[1]}") {
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

export default function Products() {
    const [products, setProducts] = useState('')
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
      fetch(apiUrl, opts)
      .then(res => res.json())
      .then(json => {
          console.log(json.data)
          setProducts(json.data.product.name)
          setItems(json.data.product.items)
        })
      .catch(error => console.error(error))
  }, [])

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
                                <Text bold size="xl">{item.price}</Text>
                                <Text bold size="xl">
                                    <Button color="blue" text="Add to cart"></Button>
                                </Text>
                        </Box>
                        </Card>
                        ))}
                    </Box>
                </Box>
            </Box> 
        </Container>
        </div>
    )
}

