import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  id: faker.random.uuid(),
  name: faker.name.findName(),
  access_token: faker.random.uuid()
});
