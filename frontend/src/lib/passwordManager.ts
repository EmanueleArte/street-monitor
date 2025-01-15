import { genSaltSync, hashSync, compareSync, hash, compare } from "bcrypt-ts"

const SALT_VALUE: number = 10
const salt = genSaltSync(SALT_VALUE);

export default function hashPassword(password: string, sync: boolean = false) {
    return sync ? Promise.resolve(hashSync(password, salt)) : hash(password, salt)
}

export function verifyPassword(password: string, hash: string, sync: boolean = false) {
    return sync ? compareSync(password, hash) : compare(password, hash)
}