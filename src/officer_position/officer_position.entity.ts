import { User } from "src/users/user.entity";
import {Column, Entity, Geometry, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";

@Entity({name: 'officer_position'})
export class OfficerPosition{

    @PrimaryColumn()
    id_officer: number;

    @Column({
        type:'geography',
        nullable: false,
        spatialFeatureType: 'Point',
        srid: 4326
    })
    position: Geometry;

    @ManyToOne(()=> User,(user)=>user.id)
    @JoinColumn({name: 'id_officer'})
    user: User;

}