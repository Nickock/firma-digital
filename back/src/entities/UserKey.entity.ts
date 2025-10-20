import { Column, Entity } from 'typeorm'
import { BaseEntity } from './BaseEntity'

@Entity()
export class UserKey extends BaseEntity {
  @Column({ type: 'varchar' })
  private_key_hash: string

  @Column({ type: 'varchar' })
  public_key: string
}
