export default function(server) {

  // Seed your development database using your factories. This
  // data will not be loaded in your tests.

  server.createList('moment', 3);
  server.create('user', {
    id: '1',
    name: 'mr. poopy-butt-hole',
    access_token: 'asdf-1234'
  });
}
