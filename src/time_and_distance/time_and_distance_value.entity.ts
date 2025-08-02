import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'time_and_distance' })
export class TimeAndDistanceValue {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 3, scale: 1 })
    km_value: number;
    @Column('decimal', { precision: 3, scale: 1 })
    min_value: number;
}