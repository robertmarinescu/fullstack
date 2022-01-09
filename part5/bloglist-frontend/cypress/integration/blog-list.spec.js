describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Smith',
      username: 'John',
      password: 'Smith'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('Log in to application').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('John')
      cy.get('#password').type('Smith')
      cy.get('#login-button').click()
      cy.contains('John Smith logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('John')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'John', password: 'Smith' })
    })

    it('A blog can be created', function() {
      cy.get('#togglable-button').click()
      cy.get('#title').type('Eurosport')
      cy.get('#author').type('Peter Hutton')
      cy.get('#url').type('eurosport.com')
      cy.get('#create-blog-button').click()

      cy.contains('Eurosport')
      cy.contains('Peter Hutton')
    })

    describe('And a blog exists', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypress creating a new blog',
          author: 'Harry Potter',
          url: 'harrypotter.com'
        })
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('1')
      })

      it('A user who created the blog can delete it', function() {
        cy.contains('view').click()
        cy.contains('Cypress creating a new blog')
        cy.contains('remove').click()
        cy.contains('Cypress creating a new blog').should('not.exist')
      })
    })

    describe('And multiple blogs exists', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'First blog created',
          author: 'Cypress',
          url: 'https://www.cypress.io/',
          likes: 15,
        })
        cy.createBlog({
          title: 'Second blog created',
          author: 'Cypress',
          url: 'https://www.cypress.io/',
          likes: 0,
        })
        cy.createBlog({
          title: 'Third blog created',
          author: 'Cypress',
          url: 'https://www.cypress.io/',
          likes: 2,
        })
      })

      it('Blogs are ordered based on number of likes, in descending order', function () {
        cy.get('[data-cy="blog"]').then(($blog) => {
          expect($blog).to.have.length(3)

          for (let i = 0; i < $blog.length; i++) {
            // Check if the number of likes of current blog is higher than or equal to that of next blog
            if (i < $blog.length - 1) {
              expect(
                Number($blog.find('[data-cy="likes"]')[i].innerText)
              ).to.be.least(
                Number($blog.find('[data-cy="likes"]')[i + 1].innerText)
              )
            } else {
              expect(
                Number($blog.find('[data-cy="likes"]')[i].innerText),
              ).to.be.most(Number($blog.find('[data-cy="likes"]')[0].innerText))
            }
          }
        })
      })

    })
  })
})