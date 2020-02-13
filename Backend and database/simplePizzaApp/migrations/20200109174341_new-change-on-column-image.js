exports.up = function(knex, Promise) {
    return knex.schema.table('orders', function(t) {
        t.string('imgPath');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('orders', function(t) {
        t.dropColumn('imgPath');
    });
};

