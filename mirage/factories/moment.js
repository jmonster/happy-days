import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title: faker.lorem.sentence,
  reason: faker.lorem.sentence,
  date: faker.date.recent
});
