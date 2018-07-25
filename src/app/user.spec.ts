import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });
  it('should accept values in the constructor', () => {
    let user = new User({
      first_name: 'Alex',
      last_name: 'Miller',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg'
    });
    expect(user.first_name).toEqual('Alex');
    expect(user.last_name).toEqual('Miller');
    expect(user.avatar).toEqual('https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg');
  });
});
