import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Only the name of author and title are diplayed by default  ', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Sam Fernando',
    url: 'www.daily-tech.com',
    likes: 6

  }

  const { container } =  render(<Blog  blog={blog} />)

  const div = container.querySelector('.defaultDisplay')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('Sam Fernando')
  expect(div).not.toHaveTextContent('www.daily-tech.com')
  expect(div).not.toHaveTextContent( 'Likes: 6')
})

test('URL and likes are displayed by clicking the view button  ', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Sam Fernando',
    url: 'www.daily-tech.com',
    likes: 6
  }

  const user = {
    name: 'test user'
  }

  const addLikes = vi.fn()
  const deleteBlog = vi.fn()
  const { container } = render(<Blog  blog={blog} user={user} addLikes={addLikes} deleteBlog={deleteBlog}/>)

  const userActivated = userEvent.setup()
  const button = screen.getByText('View')
  await userActivated.click(button)

  const div = container.querySelector('.expandedDisplay')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('Sam Fernando')
  expect(div).toHaveTextContent('www.daily-tech.com')
  expect(div).toHaveTextContent( 'Likes: 6')
})

test ('if the like button is clicked twice the eventHandler is called twice', async() => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Sam Fernando',
    url: 'www.daily-tech.com',
    likes: 6
  }

  const user = {
    name: 'test user'
  }

  const addLikes = vi.fn()
  const deleteBlog = vi.fn()
  render(<Blog  blog={blog} user={user} addLikes={addLikes} deleteBlog={deleteBlog}/>)

  const userActivated = userEvent.setup()
  const viewButton = screen.getByText('View')
  await userActivated.click(viewButton)

  const likesButton = screen.getByText('like')
  await userActivated.click(likesButton)
  await userActivated.click(likesButton)
  expect(addLikes.mock.calls).toHaveLength(2)

})
