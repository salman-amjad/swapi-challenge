import { render } from "test/utils"

import Home from "./index"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

jest.mock("app/core/hooks/useCurrentUser")
const mockUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>

test.skip("renders Characters heading", () => {
  mockUseCurrentUser.mockReturnValue({
    id: 1,
    name: "User",
    email: "user@email.com",
    role: "user",
  })

  const { getByText } = render(<Home />)
  const linkElement = getByText(/Characters/i)
  expect(linkElement).toBeInTheDocument()
})
