import { hash } from "bcrypt";
import { ClientRequests } from "src/client_requests/cliente_requests.entity";
import { OfficerPosition } from "src/officer_position/officer_position.entity";
import { Rol } from "src/roles/rol.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

/**
 * Represent the users table in the database
 *  
 */
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({ unique: true, length: 8 })
    dni: string;

    @Column({ unique: true })
    phone: string;



    @Column({ nullable: true })
    image: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    notification_token: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;




    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, Number(process.env.HASH_SALT));
    }

    @OneToMany(() => OfficerPosition,officerPosition=>officerPosition.id_officer)
    OfficerPosition: OfficerPosition;


    @OneToMany(() => ClientRequests,ClientRequests=>ClientRequests.id_client)
    ClientRequests: ClientRequests;

    @JoinTable({
        name: 'user_has_roles',
        joinColumn: {
            name:'id_user'
        },
        inverseJoinColumn: {
            name: 'id_rol'
        }
    })
    @ManyToMany(() => Rol, (rol) => rol.users)
    roles: Rol[]
}