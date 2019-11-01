import React from 'react'
import { Box, Text, Heading, Image } from 'gestalt';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
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
