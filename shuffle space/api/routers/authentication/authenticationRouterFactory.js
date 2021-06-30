import express from 'express';
import JwtAuthHandler from '../../config/authenticationConfig.js';




const authenticationRouterFactory = (authenticationConfig, isAuthenticated) => {
    const router = express.Router()
    router.post('/login', authenticationConfig.signIn);
    router.post('/logout', isAuthenticated, authenticationConfig.signOut);


    return router
}

export default authenticationRouterFactory