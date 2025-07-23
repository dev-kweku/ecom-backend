import bcrypt from 'bcrypt'

// hash password
export const hashPassword=async(plain:string)=>{
    return await bcrypt.hash(plain,10);
}

// compare password
export const comparePassword=async(plain:string,hash:string)=>{
    return await bcrypt.compare(plain,hash)
}