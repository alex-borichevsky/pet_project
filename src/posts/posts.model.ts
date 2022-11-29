import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.model";
import * as buffer from "buffer";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn({type: "bigint"})
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  // @Column()
  // pdf: Uint8Array;
  @Column({default: ''})
  image: string

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

}