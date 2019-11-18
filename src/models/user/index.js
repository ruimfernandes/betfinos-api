import User from './model';
import BaseService from '../base-service';

export class UserService extends BaseService {
  constructor () {
    super(User);
  }
}

export default new UserService();
