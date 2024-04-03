const asyncHandler=(requestHandler)=>
{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err))  
    }
}


export  {asyncHandler}




// const asyncHandler=(fn)=>async(req,res,next)=>{
//     try {
//             await  fn(req, res, next);
//     } catch (error) {
//         console.log(error); //or
//         res.status(err.code ||500).json({success:false , error : err,message:err.message});

//     }
// }