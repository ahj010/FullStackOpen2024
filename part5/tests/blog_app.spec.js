const { test, expect, beforeEach, describe } = require('@playwright/test');
const { error } = require('console');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'Hick nail',
        name: 'muntap',
        password: 'kuku22',
      }
    })
    await request.post('http://localhost:3003/api/users' ,{
      data: {
        username: 'okay123',
        name: 'Ok',
        password: 'okay321',

      }
    })
    await page.goto('http://localhost:5173')
  });

  test('Login form is shown by default', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('Hick nail')
      await page.getByTestId('password').fill('kuku22')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Hello muntap, Welcome back to your blogs!')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('Hick nail')
      await page.getByTestId('password').fill('k22')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Invalid username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173')
      await page.getByTestId('username').fill('Hick nail')
      await page.getByTestId('password').fill('kuku22')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create a new blog' }).click()
      await page.getByTestId('title').fill('a test blog using playwright')
      await page.getByTestId('author').fill('Cypress')
      await page.getByTestId('url').fill('www.playwright.dev')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('A new blog "a test blog using playwright" by Cypress added')).toBeVisible()
      await expect(page.getByText('a test blog using playwright Cypress')).toBeVisible()
    })

    test('a blog can be liked', async ({page}) => {
      await page.getByRole('button', { name: 'Create a new blog' }).click()
      await page.getByTestId('title').fill('a test blog using playwright')
      await page.getByTestId('author').fill('Cypress')
      await page.getByTestId('url').fill('www.playwright.dev')
      await page.getByRole('button', { name: 'save' }).click()

      const blogPostToLike = await page.getByText('a test blog using playwright Cypress')
      await expect(blogPostToLike).toBeVisible()

      const viewButton = blogPostToLike.locator('..').getByRole('button', { name: 'View' })
      await viewButton.click()

      const likeButton = blogPostToLike.locator('..').getByRole('button', { name: 'like' })
      await likeButton.click()

      await expect(page.getByText("You liked the blog 'a test blog using playwright' by Cypress")).toBeVisible()
      await expect(page.getByText("Likes: 1")).toBeVisible()

    })

    test('a blog can be deleted', async ({page}) => {
      await page.getByRole('button', { name: 'Create a new blog' }).click()
      await page.getByTestId('title').fill('a test blog using for deletion')
      await page.getByTestId('author').fill('Samurai')
      await page.getByTestId('url').fill('www.hayday.dev')
      await page.getByRole('button', { name: 'save' }).click()

      const blogPostToDelete = await page.getByText('a test blog using for deletion Samurai')
      await expect(blogPostToDelete).toBeVisible()

      const viewButton = blogPostToDelete.locator('..').getByRole('button', { name: 'View' })
      await viewButton.click()

      page.on('dialog', async dialog => {
        await dialog.accept()
      })

      const removeButton = blogPostToDelete.locator('..').getByRole('button', { name: 'Remove' })
      await removeButton.click()
      await expect(page.getByText("Succesfully deleted the blog 'a test blog using for deletion' by Samurai")).toBeVisible()
      await expect(blogPostToDelete).not.toBeVisible()

    })

    test('delete button is only visible to the creator', async ({page}) => {
      await page.getByRole('button', { name: 'Logout' }).click()
      await page.getByTestId('username').fill('okay123')
      await page.getByTestId('password').fill('okay321')
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByRole('button', { name: 'Create a new blog' }).click()
      await page.getByTestId('title').fill('a test blog by another user')
      await page.getByTestId('author').fill('Anony')
      await page.getByTestId('url').fill('www.nakuja.co')
      await page.getByRole('button', { name: 'save' }).click()

      const blogPostByCreator = await page.getByText('a test blog by another user Anony')
      await expect(blogPostByCreator).toBeVisible()

      const viewButtonOne = blogPostByCreator.locator('..').getByRole('button', { name: 'View' })
      await viewButtonOne.click()
      const removeButtonCreator = blogPostByCreator.locator('..').getByRole('button', { name: 'Remove' })
      await expect(removeButtonCreator).toBeVisible()

      const hideButton = blogPostByCreator.locator('..').getByRole('button', { name: 'Hide' })
      await hideButton.click()


      await page.getByRole('button', { name: 'Logout' }).click()
      await page.getByTestId('username').fill('Hick nail')
      await page.getByTestId('password').fill('kuku22')
      await page.getByRole('button', { name: 'login' }).click()

      const blogPostByNONCreator = await page.getByText('a test blog by another user Anony')
      await expect(blogPostByNONCreator).toBeVisible()
      const viewButtonTwo = blogPostByNONCreator.locator('..').getByRole('button', { name: 'View' })
      await viewButtonTwo.click()

      const removeButtonNONCreator = blogPostByNONCreator.locator('..').getByRole('button', { name: 'Remove' })
      await expect(removeButtonNONCreator).not.toBeVisible()

    })

    test('blogs are sorted according to the number of likes', async ({page}) => {


      await page.getByRole('button', { name: 'Create a new blog' }).click()
      await page.getByTestId('title').fill('Second highest number of likes')
      await page.getByTestId('author').fill('Min Pink')
      await page.getByTestId('url').fill('www.pluck.com')
      await page.getByRole('button', { name: 'save' }).click()

      await page.getByTestId('title').fill('Maximum No of likes')
      await page.getByTestId('author').fill('Max Punk')
      await page.getByTestId('url').fill('www.clickclick.org')
      await page.getByRole('button', { name: 'save' }).click()
      await page.waitForTimeout(1000)

      const secondMaxLikesBlog = await page.getByText('Second highest number of likes Min Pink')
      await expect(secondMaxLikesBlog).toBeVisible()
      const viewButtonMin = secondMaxLikesBlog.locator('..').getByRole('button', { name: 'View' })
      await viewButtonMin.click()

      const likeButtonMin = secondMaxLikesBlog.locator('..').getByRole('button', { name: 'like' })
       for (let i = 0; i < 3; i++) {
         await likeButtonMin.click()
         await page.waitForTimeout(1000)
      }
      await expect(page.getByText("Likes: 3")).toBeVisible()

      const maxLikesBlog = await page.getByText('Maximum No of likes Max Punk')
      await expect(maxLikesBlog).toBeVisible()

      const viewButtonMax = maxLikesBlog.locator('..').getByRole('button', { name: 'View' })
      await viewButtonMax.click()

      const likeButtonMax = maxLikesBlog.locator('..').getByRole('button', { name: 'like' })
      for (let i = 0; i < 4; i++) {
        await likeButtonMax.click()
      }
      // await expect(page.getByText("You liked the blog 'Maximum No of likes' by Max Punk")).toBeVisible()
      await expect(page.getByText('Likes: 4')).toBeVisible()


      const likes = await page.$$eval('.expandedDisplay p:nth-child(3)', elements =>
        elements.map(el => parseInt(el.innerText.replace('Likes: ', '')))
      )

      for (let i = 0; i < likes.length - 1; i++) {
        expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1])
      }

    })
  })
})
