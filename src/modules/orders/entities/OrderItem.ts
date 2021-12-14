import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  ManyToOne
} from 'typeorm';

import { Game } from '../../games/entities/Game'
import { Order } from './Order'

@Entity('orderItems')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Order, order => order.orderItems)
  @JoinTable()
  order: Order

  @OneToOne(() => Game)
  gameId: Game

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}