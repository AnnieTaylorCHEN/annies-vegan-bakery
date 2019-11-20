import React, {useState, useEffect, Fragment } from 'react'
import { Container, Box, Button, Heading, Text, TextField, Modal, Spinner} from 'gestalt'
import {Elements, StripeProvider, CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import { withRouter } from "react-router-dom"
import ToastMessage from './ToastMessage'
import { getCart, calculatePrice, clearCart, calculateAmount, getToken} from './utils'

const apiUrl = process.env.API_URL || 'http://avb-server.herokuapp.com'


function _CheckoutForm (props) {
    // console.log(props)

    const [formData, setFormData] = useState({
        address: '',
        zipcode: '',
        city: '', 
        confirmEmail: '',
        toast: false,
        toastMsg: '',
        orderProcessing: false,
        modal: false
    })

    // const [loading, setLoading] = useState(false)
    const [cartItems,setCartItems] = useState([])

    useEffect(()=> {
        const cartItems = getCart()
        setCartItems(cartItems)
    }, [])

    const { address, zipcode, city, confirmEmail, toast, toastMsg, orderProcessing, modal } = formData

    const handleChange = ({event}) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    
    const showToast = (toastMsg, redirect = false) => {
        setFormData({...formData, toast: true, toastMsg})
        setTimeout(() => setFormData({...formData, toast: false, toastMsg:''}), 5000)
        // if true passed to 'redirect' argument, redirect home
        setTimeout(() => redirect &&  props.history.push('/'), 6000)
    }
 
    const isFormEmpty = (address, zipcode, city, confirmEmail) => {
        return !address || !zipcode || !city || !confirmEmail
    }

    const closeModal = ( )=> setFormData({...formData, modal: false})

    const handleConfirmOrder = event => {
        event.preventDefault()
         if (isFormEmpty(address, zipcode, city, confirmEmail)){
             showToast('Please fill in all the fields')
             return
         }
         setFormData({...formData, modal:true })
    }
    
    const handleSubmitOrder = async () => {
        const amount = calculateAmount(cartItems)
        setFormData({...formData, orderProcessing: true})
       
        let token
        try {
            //create stripe token
            //create order with strapi (request to backend)
            //set orderProcessing to false set modal to false
            //clear user cart 
            //show success toast 
            let jwtToken = getToken()
            // console.log(jwtToken)
            const response = await props.stripe.createToken()
            token = response.token.id
            // console.log(token)
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ jwtToken
              }
            await axios
            .post(`${apiUrl}/orders`, {
                amount, 
                productItems: cartItems,
                city,
                zipcode, 
                address,
                token
            }, {headers})
            await axios
            .post(`${apiUrl}/email`, {
                    to: confirmEmail,
                    from: 'hi@anniesveganbakery.com',
                    subject: `Order Confirmation from Annie's Vegan Bakery`,
                    text: 'Your order has been processed.',
                    html: '<h1>Expect your order to arrive in 2-3 shipping days.</h1>'
                }
            ,{headers})
            setFormData({...formData, orderProcessing: false, modal: false})
            clearCart()
            showToast('Your order has been successfully submitted', true)
        } catch (error) {
            //set order processing to false, modal to false
            //show error message in toast
            setFormData({...formData, orderProcessing: false, modal: false})
            showToast(error.message)
        }
    }

    return (
        <div>
            <Container>
                
                <Box
                margin={4}
                padding={4}
                shape="rounded"
                display="flex"
                direction="column"
                alignItems="center"
                justifyContent="center"
                >
                <Heading color="midnight">Checkout</Heading>
                
                {/* checkout form */}
                
                {cartItems.length > 0 ? (<Fragment>
                <form
                style={{
                    display: 'inlineBlock',
                    textAlign: 'center',
                    maxWidth: 450,
                }}
                onSubmit={handleConfirmOrder}>
                    <Box
                    display="flex"
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={2}
                    marginBottom={6}
                    >
                    
                    </Box>
                    {/* cart  */}
                    <Box
                    marginBottom={2}
                    display="flex"
                    direction="column"
                    alignItems="center">
                        <Text color="darkGray" italic>{cartItems.length} for checkout</Text>
                        <Box padding={2}>
                            {cartItems.map( item => (
                                <Box key={item._id} padding={1}>
                                <Text color="midnight">{item.name} x {item.quantity} - $ {item.quantity * item.price}</Text>
                                </Box>
                            ))}
                        </Box>
                        <Text bold>Total: ${calculatePrice(cartItems)}</Text>
                    </Box>
                    {/* user shipping info input */}
                    <Text italic color="blue">Please fill in your shipping information</Text>
                    <TextField
                    id="address"
                    type="text"
                    name="address"
                    placeholder=" Shipping Address"
                    value={address}
                    onChange={handleChange}>
                    </TextField>
                    <TextField
                    id="zipcode"
                    type="text"
                    name="zipcode"
                    placeholder="Zip Code"
                    value={zipcode}
                    onChange={handleChange}>
                    </TextField>
                    <TextField
                    id="city"
                    type="text"
                    name="city"
                    placeholder="City"
                    value={city}
                    onChange={handleChange}>
                    </TextField>
                    <TextField
                    id="confirmEmail"
                    type="email"
                    name="confirmEmail"
                    placeholder="Please confirm your email"
                    value={confirmEmail}
                    onChange={handleChange}>
                    </TextField>
                    {/* credit card element */}
                    <CardElement id="stripe__input" onReady={input => input.focus()} />
                    <button id="stripe__button" type="submit">Submit</button>
                </form>
                </Fragment>) : (
                    <Box color="darkWash" shape="rounded" padding={4}>
                        <Heading align="center" color="red" size="xs">Your cart is empty</Heading>
                        <Text align="center" italic color="blue">Add some goodies!</Text>
                    </Box>
                )}
                </Box>
                {/* confirmation modal */}
                {modal && (
                    <ConfirmationModal orderProcessing={orderProcessing} cartItems={cartItems} closeModal={closeModal} handleSubmitOrder={handleSubmitOrder} />
                )}
                <ToastMessage show={toast} message={toastMsg} />
            </Container>
        </div>
    )
}

const ConfirmationModal = ({ orderProcessing, cartItems, closeModal, handleSubmitOrder}) => (
    <Modal
    accessibilityCloseLabel="close"
    accessibilityModalLabel="confirm your order"
    heading="Confirm Your Order"
    onDismiss={closeModal}
    footer={
        <Box display="flex" marginRight={-1} marginLeft={-1} justifyContent="center">
            <Box padding={1}>
                <Button
                size="lg"
                color="blue"
                text="Submit"
                disabled={orderProcessing}
                onClick={handleSubmitOrder}
                />
            </Box>
            <Box padding={1}>
                <Button
                size="lg"
                text="Cancel"
                disabled={orderProcessing}
                onClick={closeModal}
                />
            </Box>
        </Box>
    }
    role="alertdialog"
    size="sm"
    >
    {/* order summary */}
    {!orderProcessing && (
        <Box display="flex" justifyContent="center" alignItems="center" direction="column" padding={2} color="lightWash">
            {cartItems.map( item => (
                <Box key={item._id} padding={1}>
                    <Text size="lg" color="blue">
                    {item.name} x {item.quantity} - $ {item.quantity * item.price}
                    </Text>
                </Box>
            ))}
            <Box padding={2}>
                <Text size="lg" color="blue" bold>
                    Total: {calculatePrice(cartItems)}
                </Text>
            </Box>
        </Box>
    )}
        {/* order processing spinner */}
        <Spinner show={orderProcessing} accessibilityLabel="Order Processing Spinner" />
        {orderProcessing && <Text align="center" italic>Submitting your order...</Text> }
    </Modal>
)

const CheckoutForm = withRouter(injectStripe(_CheckoutForm))

const Checkout = () => (
    <StripeProvider apiKey="pk_test_IdlFKP8IhcQrBWz2JslGjvF5">
        <Elements>
            <CheckoutForm />
        </Elements>
    </StripeProvider>
)

export default Checkout