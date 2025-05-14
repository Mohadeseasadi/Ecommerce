import { User } from "src/users/entities/user.entity";
import { Collection, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'addresses'})
export class Address {
    
    @PrimaryGeneratedColumn()
    id: number ; 

    @Column({ nullable: false })
    privince: string ;

    @Column({ nullable: false })
    city: string;


    @Column({ nullable: false })
    address: string;

    @Column({ length: 10 })
    postal_code: string;

    @Column({ length: 11 })
    reciver_mobile: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(()=> User , (user: User): any=> user.addresses)
    user: User;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}
