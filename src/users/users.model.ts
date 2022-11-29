import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../posts/posts.model";
import { Role } from "../roles/roles.model";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({type: "bigint"})
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;
  @Column({default: false})
  banned: boolean;

  @Column({default: ''})
  banReason: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}