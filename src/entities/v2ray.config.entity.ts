import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('v2rayConfig')
export class V2rayConfigEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar')
    address: string;

    @Column('varchar', { length: 20 })
    country: string;

    @Column('varchar', { length: 12 })
    name: string;
}
