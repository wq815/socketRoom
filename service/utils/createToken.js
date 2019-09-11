import jwt from 'jsonwebtoken'
import {secret} from '../config'
export default function createToken(){
  const token = jwt.sign({
    user_id:new Date().getTime()  //使用用户名字符串作为token的凭证
  },secret,{
    expiresIn:'1h'
  })
  //secret是加密的密钥，验证的时候会用到.
  return token;
}