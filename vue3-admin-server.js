import server from 'pushstate-server';

server.start({
  port: 5018,
  directory: './dist',
});
