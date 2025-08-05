import { Client } from "pg";
import { ClientRequests } from "src/client_requests/cliente_requests.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'officer_trip_response' })
export class OfficerTripResponse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_officer: number;

    @Column()
    id_client_request: number;

    @Column()
    response_incident: String;

    @Column('decimal', { precision: 10, scale: 2 })
    time: number;

    @Column('decimal', { precision: 10, scale: 2 })
    distance: number;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'id_officer' })
    officer: User;

    @ManyToOne(() => ClientRequests, (clientRequests) => clientRequests.id)
    @JoinColumn({ name: 'id_client_request' })
    ClientRequests: ClientRequests;


}