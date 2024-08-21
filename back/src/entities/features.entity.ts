import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Room } from "./room.entity";


@Entity({name: 'features'})
export class Features {

    @PrimaryGeneratedColumn('uuid')
    id:string=uuid();

    @Column({nullable: false,type: 'varchar',unique: true})
    name:string;
    
    @ManyToOne(() => Room, room => room.features)
    room: Room;
    
}




    