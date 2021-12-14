import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  OneToMany,
  OneToOne
} from 'typeorm';

import { OrderItem } from './OrderItem'
import { User } from '../../users/entities/User'

@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  @JoinTable()
  orderItems: OrderItem[]

  @OneToOne(() => User)
  @JoinTable()
  user: User

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}