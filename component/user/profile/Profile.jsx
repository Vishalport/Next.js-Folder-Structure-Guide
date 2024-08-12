import React, { useContext } from 'react'
import context from '../../../context/AuthContext.js'

export default function Profile() {
    const { userAuth } = useContext(context)

    if (!userAuth) {
        return (
            <p>Hello : </p>
        )
    }

    return (
        <div>
            Hello : {userAuth?.userResult}
        </div>
    )
}
