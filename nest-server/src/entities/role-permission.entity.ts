import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Role, (role) => role.role_permissions)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.role_permissions)
  permission: Permission;
}
