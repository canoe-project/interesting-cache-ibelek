import React from 'react'
import { Redirect, Route } from 'react-router'

export const PublicRoute = ({ isLoggedIn, children, rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (!isLoggedIn) return children
        return <Redirect to="/" />
      }}
    />
  )
}
