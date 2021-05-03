import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

import Profile from '../body/profile/Profile'
import EditUser from '../body/profile/EditUser'

import Home from './home/AppView'

import {useSelector} from 'react-redux'
import ForgotPassword from '../body/auth/ForgotPassword'
import ResetPassword from '../body/auth/ResetPassword'
import CreateNewApp from './home/CreateNewApp'
import AppView from './home/AppView'
import Info from './home/Info'

function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section >
            <Switch>
                <Route path="/" component={Info} exact />

                <Route path="/login" component={isLogged ? Info : Login} exact />
                <Route path="/register" component={isLogged ? Info : Register} exact />

                <Route path="/forgotPassword" component={isLogged ? NotFound : ForgotPassword} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

                <Route path="/createApp" component={isLogged ? CreateNewApp : NotFound} exact />
                <Route path="/projects" component={isLogged ? AppView : Login} exact />

            </Switch>
        </section>
    )
}

export default Body
