import bcrypt from 'bcrypt'

import { HashComparer } from '../../data/protocols/criptography/hash-comparer'
import { Hasher } from '../../data/protocols/criptography/hasher'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  public async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  public async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
