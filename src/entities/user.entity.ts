import * as bcrypt from 'bcrypt';
import { ServiceTypeEnum } from 'src/service.type';
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

  @Column({ type: 'varchar', length: 10, nullable: true })
  startServiceDate: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  endServiceDate: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  macAddress: string;

  @Column('boolean')
  status: boolean;

  @Column({ nullable: true })
  multiUser: string;

  @Column({ default: 'user' })
  role: string;

  // اضافه کردن نوع سرویس با استفاده از enum
  @Column({
    type: 'enum',
    nullable:true,
    enum: ServiceTypeEnum,
    default: ServiceTypeEnum.GOLD,
  })
  serviceType: ServiceTypeEnum;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
