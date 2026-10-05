import jwt from 'jsonwebtoken'

 export const protect = async (req, res, next)=>{
    try {
        let token;
        const authHeader = req.headers.authorization

        if(authHeader && authHeader.startsWith('Bearer')){
            token = authHeader.split('')[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode
            return next()
        }
        if(!token){
            return res.status(401).json({
                message:"Not authrized, no token provider"
            })
        }
    } catch (error) {
        return res.status(401).json({
            message:'Token verification failed',
            error:error.message
        })
    }
}