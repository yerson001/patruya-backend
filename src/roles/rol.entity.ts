import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('roles')
export class Rol {

    @PrimaryColumn()
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    image: string;

    @Column()
    route: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @ManyToMany(()=> User,(user)=> user.roles)
    users: User[]
}