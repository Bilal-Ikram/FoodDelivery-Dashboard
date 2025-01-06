// service jo baar baar use koni haay. iss ko banana ha iss folder maay
//Can be used for every deveploment environment.
// yah aysncHandler db connection to backend ki logic ki service yah utils (utility) hay METHOD1
const aysncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => next(error))
    }
}

export default aysncHandler ;
//const aysncHandler= () => {}
//const aysncHandler= (fn) => {}
//const aysncHandler= (fn) => () => {}
//const aysncHandler= (fn) => async() => {}

// yah aysncHandler db connection to backend ki logic ki service yah utils (utility) hay METHOD2
// const aysncHandler= (fn) => async( req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             message: error.message,
//             // stack: process.env.NODE_ENV === 'development'? error.stack : null,
//             status: false
//         });
//     }
//}