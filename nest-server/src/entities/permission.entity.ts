import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RolePermission } from './role-permission.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  role_permissions: RolePermission[];
}
