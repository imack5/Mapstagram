
  exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({first_name: "Bob", last_name: "Blaney", bio: "I like fancy food places and live in Toronto.", prof_pic: 'https://static.highsnobiety.com/wp-content/uploads/2017/03/20104735/travis-scott-spelling-01-480x320.jpg'}),
        knex('users').insert({first_name: "Maria", last_name: "Melon", bio: "Yoga and biking are my passions.", prof_pic: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fimg.izismile.com%2Fimg%2Fimg5%2F20120430%2F640%2Ffamous_women_sprout_beards_part_2_640_high_26.jpg&f=1'}),
        knex('users').insert({first_name: "Cindy", last_name: "Candy", bio: "You can find me outside a candy shop.", prof_pic: 'https://orig00.deviantart.net/9af2/f/2011/227/4/8/profile_picture_by_coi_stock-d46ovqt.jpg'}),
        knex('users').insert({first_name: "Michael", last_name: "Jackson", bio: "I'm an accountant and live in a luxury condo.", prof_pic: 'https://s3.eu-central-1.amazonaws.com/artistarea.gallereplay.com/production/user_9/picture_2405201614728.jpg'}),
        knex('users').insert({first_name: "Mindy", last_name: "Kaling", bio: "NY trains suck. But I need to use them to get to places.", prof_pic: 'https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2016/05/Mindy_Kaling-e1464205636970.jpg'}),
        knex('users').insert({first_name: "Barack", last_name: "Obama", bio: "I like politics. A lot.", prof_pic: 'https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg'}),
        knex('users').insert({first_name: "Cardi", last_name: "B", bio: "Krrrrrrr. Hayyy.", prof_pic: 'https://www.billboard.com/files/media/cardi-b-tidal-x-oct-2017-ap-billboard-1548.jpg'}),
        knex('users').insert({first_name: "Bill", last_name: "Gates", bio: "Computers are pretty cool. I should go to bootcamp to learn about them.", prof_pic: 'https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg'}),
      ]);
    });
};
