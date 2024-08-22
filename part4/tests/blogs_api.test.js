const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const api = supertest(app)

describe('Blog setup', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('kuku22', 10)
    const user = new User({ username: 'Hick nail', passwordHash })
    await user.save()

    const blogPromises = helper.initialBlogs.map(blog => new Blog(blog).save())
    await Promise.all(blogPromises)
  })


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await helper.blogsInDb()

    assert.strictEqual(response.length, helper.initialBlogs.length)
 })

test('unique identifier property of the blog posts is named id', async () => {
    const response = await helper.blogsInDb()

    response.forEach(blog => {
      assert(blog.id, 'Blog post does not have an id property')
      assert(!blog._id, 'Blog post should not have an _id property')
    })
 })

test('new blogs can be created and saved to the database', async () => {
  const user = {
    username : 'Hick nail' ,
    password: 'kuku22'
}

const loggedInUser = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const token = loggedInUser.body.token

    if (!token) {
      throw new Error('Login failed, token not returned')
    }

    const newBlog = {
        title: 'World Cup',
        author: ' Steve Gold' ,
        url: ' https://crica.com/' ,
        likes: 4,
    }

  await   api.
     post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()

    const titles = response.map(blog => blog.title)
    assert.strictEqual(response.length, helper.initialBlogs.length + 1)
    assert(titles.includes('World Cup'))

 })

test('the default value of likes is 0 if the likes property is missing', async () => {
  const user = {
    username : 'Hick nail' ,
    password: 'kuku22'
}

const loggedInUser = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const newBlog = {
    title: 'Homework',
    author: 'Abbas Kiarostami' ,
    url: 'https://cineme.com/' ,
}

await   api.
 post('/api/blogs')
.send(newBlog)
.set('Authorization', `Bearer ${loggedInUser.body.token}`)
.expect(201)
.expect('Content-Type', /application\/json/)

const response = await helper.blogsInDb()

assert.strictEqual(response.length, helper.initialBlogs.length + 1)
const createdBlog = response.find(blog => blog.title === 'Homework' && blog.author === 'Abbas Kiarostami')
assert.strictEqual(createdBlog.likes, 0)
 })

 test('a blog without title or url is not added', async () => {
  const user = {
    username : 'Hick nail' ,
    password: 'kuku22'
}

const loggedInUser = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const newBlog = {
    author: ' Mike Mentzer' ,
    likes: 10,
}

await   api.
 post('/api/blogs')
.send(newBlog)
.set('Authorization', `Bearer ${loggedInUser.body.token}`)
.expect(400)

const response = await helper.blogsInDb()

assert.strictEqual(response.length, helper.initialBlogs.length)
 })

test('deleting a blog is possible', async () => {

  const user = {
    username : 'Hick nail' ,
    password: 'kuku22' }

  const loggedInUser = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const newBlog = {
      title: 'Test Blog',
      author: 'Test Writer',
      url: 'http://testblog.co',
      likes: 1
    }

    const testBlogResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${loggedInUser.body.token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogToDelete = testBlogResponse.body

  if(!blogToDelete){
    throw new Error('blog not found')
  }

  await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${loggedInUser.body.token}`)
      .expect(204)



  const responseAfterDeletion = await helper.blogsInDb()
  assert.strictEqual(responseAfterDeletion.length, helper.initialBlogs.length)
}
)

test('Adding a blog fails if token is not provided', async () => {
  const user = {
    username : 'Hick nail',
    password: 'kuku22'
}

     await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const newBlog = {
        title: 'World Cup',
        author: 'Steve Gold',
        url: 'https://crica.com/',
        likes: 4,
    }

  await   api.
     post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()

    assert.strictEqual(response.length, helper.initialBlogs.length)


 })


test('a blog can be updated', async () => {
  const response = await helper.blogsInDb()
  const blogToUpdate = response[0]


  const likesUpdate = {
    likes: 200
  }

  await api
  .put(`/api/blogs/${blogToUpdate.id}`)
  .send(likesUpdate)
  .expect(200)

  const responseAfterUpdating = await helper.blogsInDb()

 const likesAfterUpdating = await responseAfterUpdating.map(blog => blog.likes)

  assert(likesAfterUpdating.includes(200))

})

})

describe('User setup', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('Username with less than three characters is invalid', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

  })

  test('Password with less than three characters is invalid', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Matti',
      name: 'Matti Luukkainen',
      password: 'sa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

  })
})

after(async () => {
  await mongoose.connection.close()
})
