import React from 'react'
import { Box, Text, Heading, Image, Button } from 'gestalt';
import { NavLink, withRouter } from 'react-router-dom';
import { getToken, clearToken, clearCart } from './utils'

const Navbar = ({ history }) => {
    const handleSignout = () => {
        clearToken()
        clearCart()
        history.push('/')
    }

    return getToken() !== null ? <AuthNav handleSignout={handleSignout} /> : <UnAuthNav />
}

const AuthNav = ({handleSignout}) => {
    return (
        <div> 
            <Box
            display="flex"
            alignItems="center"
            justifyContent="around"
            height={70}
            color="lightWash"
            padding={1}
            shape={"square"}
            >

                <NavLink activeClassName="active" exact to="/">
                    <Box display="flex" alignItems="center">
                        <Box margin={2} height={50} width={50}>
                            <Image
                            alt="annie's vegan bakery logo"
                            naturalHeight={1}
                            naturalWidth={1}
                            src="./images/AVB-logo.png"
                            />
                        </Box>
                        <Heading size="xs">
                        Annie's Vegan Bakery
                        </Heading>
                    </Box>
                </NavLink>

                <NavLink activeClassName="active" to="/checkout">
                    <Text size="xl" color="darkGray">Checkout</Text>
                </NavLink>
                
                <Button onClick={handleSignout} color="red" text="Sign Out" inline siz="md" />
            </Box>
        </div>
    )
}

const UnAuthNav = () => {
    return (
        <div> 
            <Box
            display="flex"
            alignItems="center"
            justifyContent="around"
            height={70}
            color="lightWash"
            padding={1}
            shape={"square"}
            >

                <NavLink activeClassName="active" exact to="/">
                    <Box display="flex" alignItems="center">
                        <Box margin={2} height={50} width={50}>
                            <Image
                            alt="annie's vegan bakery logo"
                            naturalHeight={1}
                            naturalWidth={1}
                            src="./images/AVB-logo.png"
                            />
                        </Box>
                        <Heading size="xs">
                        Annie's Vegan Bakery
                        </Heading>
                    </Box>
                </NavLink>

                <NavLink activeClassName="active" to="/signup">
                    <Text size="xl" color="darkGray">Sign Up</Text>
                </NavLink>

                <NavLink activeClassName="active" to="/signin">
                    <Text size="xl" color="darkGray">Sign In</Text>
                </NavLink>
            </Box>
        </div>
    )
}

export default withRouter(Navbar)