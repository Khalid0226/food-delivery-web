// import jwt from 'jsonwebtoken'

// const authMiddleware =  (req,res,next) =>{

//     const token = req.header('Authorization')

//     if (!token) {
//         res.status(401).json({
//             message:'no token access denied'
//         })
//     }

//     try {
//         const decoded = jwt.verify(token.split(" ")[1],'secretkey')
//         req.user = decoded

//         next()
//     } catch (error) {
//         res.status(500).json({
//             message:'failed',
//             error:error.message
//         })
//     }
// }

// export default authMiddleware
