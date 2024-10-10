import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pricing')
export class PricingEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50 })
    serviceName: string;

    @Column({ type: 'varchar', length: 20 })
    price: string;

    @Column({ type: 'varchar', length: 20 })
    duration: string;

    @Column({ type: 'varchar',length:10, nullable: true })
    multiUser: string;

    @Column({ type: 'varchar', length: 8 })
    platform: string;


}
