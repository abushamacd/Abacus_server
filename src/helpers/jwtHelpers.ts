/* eslint-disable @typescript-eslint/ban-ts-comment */
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

export const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string,
): string => {
  // @ts-ignore
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  })
}

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}
