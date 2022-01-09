import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('check that the form calls the event handler it received as props with the right details when a new blog is created', () => {
    const mockCreateBlogFn = jest.fn()

    const component = render(
      <BlogForm createBlog={mockCreateBlogFn} />
    )

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
      target: { value: 'Daily Blog' }
    })

    fireEvent.change(inputAuthor, {
      target: { value: 'John Smith' }
    })

    fireEvent.change(inputUrl, {
      target: { value: 'johnsmith.com' }
    })

    fireEvent.submit(form)
    expect(mockCreateBlogFn.mock.calls).toHaveLength(1)
    expect(mockCreateBlogFn.mock.calls[0][0].title).toBe('Daily Blog')
    expect(mockCreateBlogFn.mock.calls[0][0].author).toBe('John Smith')
    expect(mockCreateBlogFn.mock.calls[0][0].url).toBe('johnsmith.com')
  })
})