import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={addBlog} />)

  const createButton = screen.getByText('Create a new blog')
  await user.click(createButton)

  const inputTitle = screen.getByTestId('title')
  const inputAuthor = screen.getByTestId('author')
  const inputUrl = screen.getByTestId('url')
  const sendButton = screen.getByText('save')

  await user.type(inputTitle, 'testing a form')
  await user.type(inputAuthor, 'Virgil')
  await user.type(inputUrl, 'www.react-test.com')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toBe('testing a form')
  expect(addBlog.mock.calls[0][1]).toBe('Virgil')
  expect(addBlog.mock.calls[0][2]).toBe('www.react-test.com')
})
