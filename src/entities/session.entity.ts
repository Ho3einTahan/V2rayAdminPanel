import { Entity, Column, Index, PrimaryColumn } from 'typeorm';
import { ISession } from 'connect-typeorm';

@Entity('session') // نام جدول در دیتابیس
export class SessionEntity implements ISession {
  @Index()
  @Column('bigint')
  expiredAt: number;
  
  @PrimaryColumn('varchar', { length: 255 })
  id: string;

  @Column('text')
  json: string;

  // فیلدهای اضافی برای نگهداری اطلاعات متا مربوط به سشن
  @Column('timestamp', { nullable: true })
  destroyedAt?: Date;

  @Column('varchar', { length: 255, nullable: true })
  email?: string;

  @Column('text', { nullable: true })
  ipAddress?: string;

  @Column('varchar', { length: 255, nullable: true })
  userAgent?: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  loggedInAt: Date;
}
