import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { RolePermission } from './role-permission.entity';
import { UserRole } from './user-role.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  @JoinTable()
  role_permissions: RolePermission[];

  @ManyToOne(() => UserRole, (userRole) => userRole.role)
  user_roles: UserRole[];
}
