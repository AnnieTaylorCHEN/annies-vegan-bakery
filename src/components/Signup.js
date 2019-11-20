import React, {useState } from 'react'
import { Container, Box, Button, Heading, Text, TextField} from 'gestalt'
import axios from 'axios'
import ToastMessage from './ToastMessage'
import { setToken} from './utils'

// const apiUrl = process.env.API_URL || 'http://localhost:1337/auth/local/register'
const apiUrl = process.env.API_URL || 'http://avb-server.herokuapp.com/auth/local/register'


export default function Signup({history}) {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '', 
        toast: false,
        toastMsg: '',
    })

    const [loading, setLoading] = useState(false)

    const { username, email, password, toast, toastMsg } = formData

    const handleChange = ({event}) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    
    const showToast = toastMsg => {
        setFormData({...formData, toast: true, toastMsg})
        setTimeout(() => setFormData({...formData, toast: false, toastMsg:''}), 5000)
    }
 
    const isFormEmpty = (username, email, password) => {
        return !username || !email || !password
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (isFormEmpty(username, email, password)){
           showToast('Please fill in your information!')
           return
        }
        console.log('submitted') 
        //sign up user
        try {
            //set loading to true
            //make request to register user with strapi
            //set loading to false
            //put token to manage user session in local storage
            //redirect user to home page
            
            setLoading(true)
            axios
            .post(apiUrl, {
                username,
                email,
                password
            })
            .then(response => {
                setLoading(false)
                setToken(response.data.jwt)
                console.log(response)
                history.push('/')
            })
            
        } catch (error) {
            //set loading to false
            //show error message with toast message
            setLoading(false)
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
                justifyContent="center"
                >
                {/* sign up form */}
                <form
                style={{
                    display: 'inlineBlock',
                    textAlign: 'center',
                    maxWidth: 450,
                }}
                onSubmit={handleSubmit}>
                    <Box
                    marginBottom={2}
                    display="flex"
                    direction="column"
                    alignItems="center"
                    >
                    <Heading color="midnight">Let's get started</Heading>
                    <Text italic color="blue">Signup to order your favorite treats</Text>
                    </Box>
                    {/* user name input */}
                    <TextField
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleChange}>
                    </TextField>
                    <TextField
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}>
                    </TextField>
                    <TextField
                    id="password"
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}>
                    </TextField>
                    <Button inline disabled={loading} color="blue" text="submit" type="submit"></Button>
                </form>
                </Box>
                <ToastMessage show={toast} message={toastMsg} />
            </Container>
        </div>
    )
}
