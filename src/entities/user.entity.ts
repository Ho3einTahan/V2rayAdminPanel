import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 110 })
  password: string;

  @Column()
  userName: string;

  @Column({type:'varchar' ,length:10,nullable: true})
  startServiceDate: string;

  @Column({type:'varchar' ,length:10,nullable: true})
  endServiceDate: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  macAddress: string;
  
  @Column('boolean')
  status:boolean;

  @Column({ nullable: true })
  multiUser: string;

  @Column({ default: 'user' })
  role: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }


}