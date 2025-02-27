import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
      const user = await this.repository.findOne({
        where: { id: user_id },
        join: {
          alias: 'user',
          leftJoinAndSelect: { games: 'user.games' }
        }
      })

      if (!user) {
        throw new Error('User does not exists.');
      }

      return user
       
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("SELECT * FROM users ORDER BY first_name asc"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository
      .query(
        `SELECT * FROM users WHERE LOWER(first_name) = LOWER($1) AND LOWER(last_name) = LOWER($2)`, 
        [first_name, last_name]
      );
  }
}
