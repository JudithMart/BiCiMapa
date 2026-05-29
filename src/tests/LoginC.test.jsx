import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginC from '../shared/components/LoginC'


describe('LoginC', () => {

  test('renderiza inputs', () => {
    render(<LoginC />)

    expect(screen.getByPlaceholderText(/Ingresa tu email/i))
      .toBeInTheDocument()

    expect(screen.getByPlaceholderText(/\*\*\*\*\*/i))
      .toBeInTheDocument()
  })

  test('permite escribir en inputs', async () => {
    render(<LoginC />)

    const email = screen.getByPlaceholderText(/Ingresa tu email/i)

    await userEvent.type(email, 'test@test.com')

    expect(email).toHaveValue('test@test.com')
  })

})