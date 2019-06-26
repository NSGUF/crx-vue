import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export default class User {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  bookmarks: Object[];

}
