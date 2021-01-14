const connection = require('../middleware/connection');

async function createRecipe(name, ingredients, preparations) {
  const insertRecipe = await connection('recipes').then((db) =>
    d.insertOne({ name, ingredients, preparations })
  );
  return { name, ingredients, preparations }
}
