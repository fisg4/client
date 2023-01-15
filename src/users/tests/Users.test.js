import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { renderWithProviders } from '../../utils/test-utils'
import { useState } from 'react'
import Users from '../Users'
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter } from "react-router-dom";

// describe('Users', () => {

//     let container = null;
//     beforeEach(() => {
//     // setup a DOM element as a render target
//     container = document.createElement("div");
//     document.body.appendChild(container);
//     });

//     afterEach(() => {
//     // cleanup on exiting
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
//     });

//   it('Renders login form', async () => {
//       const { unmount } = renderWithProviders(
//           <Users />,
//           { container }
//       );
//       // expect Login button
//         expect(container.querySelector("button").textContent).toBe("Log in");
//       unmount();
//   })

//     it('should render the user profile when isLoggedIn is true', async () => {
//         const { getByText } = renderWithProviders(<Users isLoggedIn={true} />);
//         expect(getByText('Usuario:')).toBeInTheDocument()
//         expect(getByText('Email:')).toBeInTheDocument()
//         expect(getByText('Update data')).toBeInTheDocument()
//         expect(getByText('Sign off')).toBeInTheDocument()
//         expect(getByText('Liked songs')).toBeInTheDocument()
//         // Check if the LikedSongs component is rendered
//         expect(getByTestId('liked-songs')).toBeInTheDocument()
//     });


//     // it('should call the handleSubmit function when the form is submitted', async () => {
//     //     const handleSubmit = jest.fn()
//     //     const { getByTestId } = render(<Users handleSubmit={handleSubmit} />)
//     //     const form = getByTestId('login-form')
//     //     fireEvent.submit(form)
//     //     expect(handleSubmit).toHaveBeenCalled()
//     // })


// //   it('should call the handleSignOff function when the sign off button is clicked', async () => {
// //     const handleSignOff = jest.fn()
// //     const { getByText } = render(<Users handleSignOff={handleSignOff} />)

// //     fireEvent.click(getByText('Sign Off'))

// //     expect(handleSignOff).toHaveBeenCalled()
// //   })

// //   it('should call the handleUpdate function when the form is submitted', async () => {
// //     const handleUpdate = jest.fn()
// //     const { getByText } = render(<Users handleUpdate={handleUpdate} />)

// //     fireEvent.submit(getByText('Update'))

// //     expect(handleUpdate).toHaveBeenCalled()
// //   })

// //   it('should show an error message when the password and confirm password do not match', async () => {
// //     const { getByText } = render(<Users />)

// //     fireEvent.submit(getByText('Update'))

// //     expect(getByText('Passwords do not match')).toBeInTheDocument()
// //   })
// })

describe('Users', () => {
    let isLoggedIn;
  
    beforeEach(() => {
      isLoggedIn = true;
    });
  
    test('renders correctly when logged in', () => {
      const { container } = render(<Users isLoggedIn={isLoggedIn} />);
      expect(container).toMatchSnapshot();
    });
  
    test('does not render when not logged in', () => {
      isLoggedIn = false;
      const { container } = render(<Users isLoggedIn={isLoggedIn} />);
      expect(container.firstChild).toBeNull();
    });
  });
