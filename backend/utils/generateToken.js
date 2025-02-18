import jwt from "jsonwebtoken"

export const generateToken = (id,role)=>{
  return jwt.sign({id,role},process.env.SECRET_KEY,{expiresIn:"4h"})

}