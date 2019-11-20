import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {Container, Box, Heading, Card, Image, Text, SearchField, Icon } from 'gestalt';
import './App.css';

const apiUrl = process.env.API_URL || 'http://avb-server.herokuapp.com/graphql'
const imageUrl = process.env.API_URL || 'http://avb-server.herokuapp.com'

const query = `query {
           products {
           _id
           name
           description
           image {
            url
           }
         }
      }`

const opts = {
  method: 'POST',
  headers: { "Content-Type": "application/json"},
  body: JSON.stringify({query})
}

const App = () => {
  const [data, setData]= useState({
    products: [], 
    
  })
  const [search, setSearch]= useState({
    searchTerm: ''
  })
  
  useEffect(() => {
      fetch(apiUrl, opts)
      .then(res => res.json())
      .then(json => setData({ products: json.data.products}))
      .catch(error => console.error(error))
  }, [])

  const handleChange = ({value}) => {
    // console.log(value)
    setSearch({searchTerm: value})
  }

  const filteredProducts = (searchTerm, products) => {
    return products.filter(product => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    }) 
  }
  
  const { searchTerm } = search
  const { products } = data
  
  return (
    
    <div>
      <Container> 
        {/* Search Field */}
        <Box
          display="flex"
          justifyContent="center"
          marginTop={4}
          >
          <SearchField 
            id="searchField"
            accessibilityLabel="search for products"
            onChange={handleChange}
            value={searchTerm}
            placeholder="search products"
            />
            <Box margin={2}>
              <Icon 
                icon="search"
                color={searchTerm ? 'watermelon' : 'gray'}
                size={20}
                accessibilityLabel="filter"
              />
            </Box>
        </Box>
        {/*product title */}
        <Box
        display="flex"
        justifyContent="center"
        marginBottom={2}
        >
        <Heading color="midnight" size="md">
        Bakery that's 100% plant-based
        </Heading>
        </Box>
        {/*products */}
        <Box display="flex" justifyContent="around">
          {filteredProducts(searchTerm, products).map(product => (
            <Box
              padding ={4}
              margin={4}
              key={product._id}
            >
              <Card
                image={
                  <Box width={500} height={500}>
                    <Image
                      alt={`${imageUrl}${product.image.name}`}
                      src={`${imageUrl}${product.image.url}`}
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
              >
                <Text bold size="xl">{product.name}</Text>
                <Text>{product.description}</Text>
                <Text bold size="xl">
                  <Link to={`/${product._id}`}>Read More</Link>
                </Text>
              </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </div>
  );
}

export default App;
