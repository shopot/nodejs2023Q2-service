import { User } from '../entities/user.entity';
import { Exclude, Transform } from 'class-transformer';

export class UserTransformer extends User {
  @Exclude()
  password;

  @Transform(({ value }) => new Date(value).getTime())
  createdAt: Date | number;

  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: Date | number;

  constructor(partial: Partial<UserTransformer>) {
    super();
    Object.assign(this, partial);
  }
}
