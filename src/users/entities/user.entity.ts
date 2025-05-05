import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserRoleEnum from "../enums/user.enum";

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number ; 

    @Column({ unique: true })
    phone: string ;

    @Column({ nullable: false })
    display_name: string ;
    
    @Column({ nullable: true })
    password: string ;

    @Column({ type:'enum' , enum: UserRoleEnum, default:UserRoleEnum.User })
    role: UserRoleEnum ;

    @CreateDateColumn()
    createAt: Date ;

    @UpdateDateColumn()
    updateAt: Date ;
    
}
