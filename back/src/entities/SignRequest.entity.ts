import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { ExternalApp } from './ExternalApp.entity'

@Entity()
export class SignRequest extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true }) //Tal vez haya que eliminar el "unique"
  doc_hash: string

  @Column({ type: 'varchar', nullable: true })
  doc_id: string

  @Column({ type: 'varchar', nullable: true })
  doc_url: string

  @Column({ type: 'varchar', nullable: false })
  callback_url: string

  @Column({ type: 'varchar', nullable: true })
  return_url: string

  @Column({ type: 'varchar', nullable: true })
  description: string

  @Column({ type: 'boolean', default: false })
  isSigned: boolean

  @ManyToOne(() => ExternalApp, (externalApp) => externalApp.sign_requests, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'externalApp_id' })
  external_app: ExternalApp

  @Column({ name: 'externalApp_id', type: 'uuid' })
  external_app_id: string
}
