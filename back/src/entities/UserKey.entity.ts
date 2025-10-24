import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { User } from './User.entity'

@Entity()
export class UserKey extends BaseEntity {
  @Column({ type: 'varchar' })
  private_key_encrypted: string

  @Column({ type: 'varchar' })
  public_key: string

  @Column({ type: 'varchar' })
  encryptionIv: string

  @OneToOne(() => User, (user) => user.userKey)
  @JoinColumn()
  user: User
}
