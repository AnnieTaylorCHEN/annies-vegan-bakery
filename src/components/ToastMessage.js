import React from 'react'
import { Toast, Box } from 'gestalt'

export default function ToastMessage({ show, message }) {
    return (
        show && (
            <Box
            dangerouslySetInlineStyle={{
                __style: {
                    top: 400,
                    left: '50%',
                    transform: "translateX(-50%)"
                }
            }}
            position="fixed"
            >
               <Toast color="red" text={message} /> 
            </Box>
        )
    )
}
