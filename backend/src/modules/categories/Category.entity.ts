import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from '../locations/Location.entity';

/**
 * - You should make sure they are properly decorated for typeorm
 */
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'name', unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Location, (location) => location.category)
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  locations: Location[];
}
