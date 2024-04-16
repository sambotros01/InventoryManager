exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('item').del()
  await knex('inventory').del()

  await knex.raw('TRUNCATE TABLE item RESTART IDENTITY CASCADE')
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')


  .then( () => {
    return knex('users').insert([
      {name_first: 'Sarah', name_last: 'Smith', username: 'sarah.smith', password: 'password'},
      {name_first: 'Ryan', name_last: 'Rose', username: 'humbug194', password: 'password'},
      {name_first: 'George', name_last: 'Albano', username: 'game4life32', password: 'password'},
      {name_first: 'Marcus', name_last: 'Wilson', username: 'supra01', password: 'password'},
      {name_first: 'Johnny', name_last: 'Appleseed', username: 'jonno234', password: 'password'},
      {name_first: 'Matt', name_last: 'Wegenke', username: 'matt87', password: 'password'},
      {name_first: 'Jeff', name_last: 'Haddock', username: 'jeff123', password: 'password'},
      {name_first: 'Lisa', name_last: 'Johnson', username: 'lisa_j', password: 'password'}
    ])
  })

  .then( () => {
    return knex('item').insert([
      {item_name: 'Apples', item_description: 'A crisp and juicy fruit with a sweet or tart flavor, typically round or oval in shape and ranging in color from green to red or yellow. Apples are versatile and can be eaten fresh, used in cooking and baking, or made into juice and cider.', quantity: 100},
      {item_name: 'Milk', item_description: 'A nutritious liquid produced by mammals, particularly cows, commonly used in cooking, baking, and as a beverage, available in various forms such as whole, skim, or plant-based alternatives like almond milk or soy milk.', quantity: 50},
      {item_name: 'Chicken', item_description: 'Boneless, skinless chicken breast meat, versatile and lean, suitable for grilling, baking, sautéing, or poaching, used in a wide range of recipes from salads to main dishes.', quantity: 25},
      {item_name: 'Bananas', item_description: 'A curved, elongated fruit with a creamy flesh and sweet flavor, enclosed in a yellow peel. Bananas are rich in potassium and are commonly eaten fresh as a convenient and nutritious snack.', quantity: 30},
      {item_name: 'Pasta', item_description: 'A staple food made from dough consisting of wheat flour, water, and sometimes eggs, formed into various shapes such as spaghetti, penne, or lasagna sheets, and cooked by boiling.', quantity: 150},
      {item_name: 'Sugar', item_description: 'A sweet, crystalline substance derived from various sources such as sugarcane or sugar beets, used to sweeten beverages and foods, as well as a key ingredient in baking.', quantity: 80},
      {item_name: 'Oranges', item_description: 'A citrus fruit with a bright orange-colored rind and juicy, segmented flesh, known for its sweet and tangy flavor. Oranges are high in vitamin C and are often consumed fresh or juiced.', quantity: 90},
      {item_name: 'Canned Beans', item_description: 'Beans such as black beans, kidney beans, or chickpeas preserved in cans, convenient for adding protein and fiber to soups, stews, salads, and chili.', quantity: 60},
      {item_name: 'Eggs', item_description: 'A common food item laid by birds, particularly chickens, used in cooking and baking as a binding agent, leavening agent, or as a main ingredient in dishes such as omelets and cakes.', quantity: 200},
      {item_name: 'Onions', item_description: 'A versatile vegetable with a pungent flavor, used as a base ingredient in many recipes such as soups, stews, sauces, and stir-fries.', quantity: 75},
      {item_name: 'Pineapples', item_description: 'A tropical fruit with a spiky, rough exterior and sweet, juicy yellow flesh, typically eaten fresh or used in cooking, baking, and cocktails. Pineapples contain bromelain, an enzyme that aids digestion.', quantity: 40},
      {item_name: 'Butter', item_description: 'A dairy product made from churned cream, containing milk fat, commonly used in baking, cooking, and as a spread on bread and toast.', quantity: 20},
    ])
  })

  .then( () => {
    return knex('inventory').insert([
      {item_id: 1, user_id: 1},
      {item_id: 1, user_id: 2},
      {item_id: 1, user_id: 3},
      {item_id: 2, user_id: 1},
      {item_id: 2, user_id: 2},
      {item_id: 2, user_id: 3},
      {item_id: 3, user_id: 4},
      {item_id: 3, user_id: 5},
      {item_id: 3, user_id: 6},
      {item_id: 4, user_id: 4},
      {item_id: 4, user_id: 5},
      {item_id: 4, user_id: 6},
      {item_id: 5, user_id: 7},
      {item_id: 5, user_id: 8},
      {item_id: 5, user_id: 1},
      {item_id: 6, user_id: 2},
      {item_id: 6, user_id: 6},
      {item_id: 6, user_id: 8},
      {item_id: 7, user_id: 1},
      {item_id: 7, user_id: 4},
      {item_id: 7, user_id: 6},
      {item_id: 8, user_id: 2},
      {item_id: 8, user_id: 4},
      {item_id: 8, user_id: 6},
      {item_id: 9, user_id: 1},
      {item_id: 9, user_id: 8},
      {item_id: 9, user_id: 5},
      {item_id: 10, user_id: 3},
      {item_id: 10, user_id: 5},
      {item_id: 10, user_id: 7},
      {item_id: 11, user_id: 2},
      {item_id: 11, user_id: 7},
      {item_id: 11, user_id: 4},
      {item_id: 12, user_id: 2},
      {item_id: 12, user_id: 7},
      {item_id: 12, user_id: 8}
    ])
  })
};

