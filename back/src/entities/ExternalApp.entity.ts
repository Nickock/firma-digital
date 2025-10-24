import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { SignRequest } from './SignRequest.entity'

@Entity()
export class ExternalApp extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string
  @Column({ type: 'varchar', nullable: false, unique: true })
  api_key: string

  @OneToMany(() => SignRequest, (signRequest) => signRequest.external_app)
  sign_requests: SignRequest[]
}
