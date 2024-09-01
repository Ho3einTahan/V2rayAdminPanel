import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({nullable:true})
  password: string;

  @Column()
  userName: string;

  @Column({ nullable: true })
  startServiceDate: Date;

  @Column({ nullable: true })
  endServiceDate: Date;

  @Column({ nullable: true })
  macAddress: string;

  @Column({ nullable: true })
  multiUser : string;

  @Column({ default: 'user' })
  role: string;
}