import jwt from "jsonwebtoken"

const JWT_SECRET=process.env.JWT_SECRET!;
// accesing token
export const signAccessToken=(userId:string)=>{
    return jwt.sign({sub:userId},JWT_SECRET,{expiresIn:"15m"})
}

// refresh token
export const signRefresgToken=(userId:string)=>{
    return jwt.sign({sub:userId},JWT_SECRET,{expiresIn:"7d"})
}

export const verifyToken=(token:string)=>{
    return jwt.verify(token,JWT_SECRET);
}