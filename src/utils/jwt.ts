import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export type Token = {
  id: number,
  username: string,
};

const jwtUtil = {
  createToken(payload: Token): string {
    return jwt.sign(payload, secret);
  },
  
  getPayload(token: string): Token { 
    return jwt.verify(token, secret) as Token;
  },
};

export default jwtUtil;
