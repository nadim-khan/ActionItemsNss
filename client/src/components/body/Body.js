import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

import Profile from '../body/profile/Profile'
import EditUser from '../body/profile/EditUser'

import Home from '../body/home/Home'

import {useSelector} from 'react-redux'
import ForgotPassword from '../body/auth/ForgotPassword'
import ResetPassword from '../body/auth/ResetPassword'

function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section >
            <Switch>
                <Route path="/" component={Home} exact />

                <Route path="/login" component={isLogged ? Home : Login} exact />
                <Route path="/register" component={isLogged ? Home : Register} exact />

                <Route path="/forgotPassword" component={isLogged ? NotFound : ForgotPassword} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

            </Switch>
        </section>
    )
}

export default Body
