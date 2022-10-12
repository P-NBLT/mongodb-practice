const data = require("./data");
const mongoose = require("mongoose");
const User = require("./model/user");
const Post = require("./model/post");
const Categories = require("./model/categories");

mongoose.connect("mongodb://localhost/testdb");

// generateUser();
async function generateUser() {
  //   const user = new User({ name: "Pierre", age: 27 });
  //   await user.save();
  //   console.log(user);
  try {
    // const user = await User.create({
    //   name: "Tom",
    //   age: 32,
    //   email: "test@test.com",
    //   hobbies: ["code", "badminton"],
    // });
    const user = await User.where("name").equals("Pierre");
    user[0].post =
      // user.name = "Thomas";
      // await user.save();
      console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}

// createPost();
async function createPost() {
  //I first we create a category if it does not already exist!

  //1 we check if the cateegory exist in the db
  const categories = ["Tech", "Js", "MongoDB", "Mongoose"];
  const isCategory = [];
  const isNotCategory = [];
  for (let item of categories) {
    const runCheck = await Categories.where("categoriesName").equals(item);
    if (runCheck.length !== 0) isCategory.push(runCheck);
    else isNotCategory.push(item);
  }

  //2 if it does not then we create the category

  if (isNotCategory.length > 0) {
    for (let item of isNotCategory) {
      const newCategory = await Categories.create({
        categoriesName: item,
      });
      isCategory.push(newCategory);
    }
  }

  // 3 We save the id of each category in an array so we can use it for post ref

  const categoriesId = [];

  for (let item of categories) {
    const id = await Categories.where("categoriesName").equals(item);
    categoriesId.push(id[0]["_id"]);
  }

  //II then we create the post and add the categories ref

  const post = await Post.create({
    title: "My second post",
    content:
      "This article is to check that it really work. but this time it s not fun so we don't have the fun category",
    user: "634693c7d0735daad00a1e24",
    categories: categoriesId,
  });

  console.log(post["_id"]);
  // III Now we have the post we can ref the post id in Categories

  for (let item of categories) {
    const category = await Categories.where("categoriesName").equals(item);
    category[0].posts = post["_id"];
    await category[0].save();
  }
}

readDB();
async function readDB() {
  const dbUser = await User.find();

  const dbPost = await Post.find();

  const dbCategory = await Categories.find();

  console.log(dbUser, dbPost, dbCategory);
}
