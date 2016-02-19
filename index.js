var Table = require('cli-table');
var table = new Table({ head: ['Method', 'Path', 'Description', 'Notes', 'Tags'] });

module.exports = function (server) {
  var hapiTable = server.table();
  var routes = hapiTable[0].table;
  var _row = [];
  routes.reverse();
  routes.forEach(function (route) {
    _row.push((route.method || '').toUpperCase());
    _row.push(route.path || '');
    _row.push(route.settings.description || '');
    _row.push(route.settings.notes || '');
    _row.push(route.settings.tags ? route.settings.tags.join(', ') : '');
    table.push(_row);
    _row = [];
  });

  var size = table.width - 11;
  var phrase = 'Routes for this server';
  var halfSize = (size - phrase.length) / 2;
  var leftSize = Math.ceil(halfSize);
  var rightSize = Math.ceil(halfSize);
  rightSize = halfSize === leftSize && halfSize === rightSize ? rightSize + 1 : rightSize;
  var top = '┌' + Array(size).join('─') + '┐';
  var middle = '│' + Array(leftSize).join(' ') + phrase + Array(rightSize).join(' ') + '│';
  var bottom = '└' + Array(size).join('─') + '┘';
  console.log(top);
  console.log(middle);
  console.log(bottom);
  console.log(table.toString());
};
