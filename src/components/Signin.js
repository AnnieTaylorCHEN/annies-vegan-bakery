import React, {useState } from 'react'
import { Container, Box, Button, Heading, TextField} from 'gestalt'
import axios from 'axios'
import ToastMessage from './ToastMessage'
import { setToken} from './utils'

const apiUrl = process.env.API_URL || 'http://avb-server.herokuapp.com/auth/local'


export default function Signin({history}) {

    const [formData, setFormData] = useState({
        email: '',
        password: '', 
        toast: false,
        toastMsg: '',
    })

    const [loading, setLoading] = useState(false)

    const { email, password, toast, toastMsg } = formData

    const handleChange = ({event}) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    
    const showToast = toastMsg => {
        setFormData({...formData, toast: true, toastMsg})
        setTimeout(() => setFormData({...formData, toast: false, toastMsg:''}), 5000)
    }
 
    const isFormEmpty = (email, password) => {
        return !email || !password
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (isFormEmpty(email, password)){
           showToast('Please fill in your information!')
           return
        }
        console.log('submitted') 
        
        try {
            setLoading(true)
            axios
            .post(apiUrl, {
                identifier: email,
                password
            })
            .then(response => {
                setLoading(false)
                setToken(response.data.jwt)
                console.log(response)
                history.push('/')
            })
            
        } catch (error) {
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
                    <Heading color="midnight">Welcome back!</Heading>
                    </Box>
                    
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

