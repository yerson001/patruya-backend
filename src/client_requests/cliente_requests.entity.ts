import { Point } from "geojson";
import { OfficerTripResponse } from "src/officer_trip_response/officer_trip_response.entity";
//import { DriverTripOffers } from "src/driver_trip_offers/driver_trip_offers.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, Geometry, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Status {
    CREATED = 'CREATED',
    ACCEPTED = 'ACCEPTED',
    ON_THE_WAY = 'ON_THE_WAY',
    ARRIVED = 'ARRIVED',
    TRAVELLING = 'TRAVELLING',
    FINISHED = 'FINISHED',
    CANCELLED = 'CANCELLED'
}

@Entity({ name: 'client_requests' })
export class ClientRequests {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_client: number;

    @Column('varchar', { length: 20 })
    incident_type: string;

    @Column()
    pickup_description: string;

    @Column()
    destination_description: string;
    /*
        @Column({ nullable: true })
        id_driver_assigned: number;
    
        @Column({ nullable: true })
        fare_assigned: number;
    
        @Column('decimal', { nullable: true, precision: 5, scale: 2 })
        client_rating: number;
    
        @Column('decimal', { nullable: true, precision: 5, scale: 2 })
        driver_rating: number;
        */

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326,
        nullable: false
    })
    pickup_position: Geometry;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326,
        nullable: false
    })
    destination_position: Geometry;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.CREATED
    })
    status: Status

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;


    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'id_client' })
    user: User;

    @OneToMany(() => OfficerTripResponse, officerTripResponse => officerTripResponse.id_client_request)
    OfficerTripResponse: OfficerTripResponse;


}