import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders blog\'s title and author, but does not render url and and the number of likes by defauly', () => {
    const blog = {
      title: 'Test Blog 1',
      author: 'John Smith',
      url: 'testblog.com',
      likes: 10,
      user: {
        name: 'John Smith',
        username: 'johnsmith'
      }
    }

    const component = render(
      <Blog blog={blog}/>
    )

    const title = component.container.querySelector('.blogTitle')
    const author = component.container.querySelector('.blogAuthor')
    const url = component.container.querySelector('.blogUrl')
    const likes = component.container.querySelector('.blogLikes')

    const defaultHiddenContent = component.container.querySelector('.hiddenContent')
    expect(defaultHiddenContent).toHaveStyle('display: none')

    expect(title).toHaveTextContent('Test Blog 1')
    expect(author).toHaveTextContent('John Smith')
    expect(url).toHaveTextContent('testblog.com')
    expect(likes).toHaveTextContent('10')
  })
})