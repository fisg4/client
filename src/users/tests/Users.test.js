import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { renderWithProviders } from '../../utils/test-utils'
import Users from '../Users'
import { unmountComponentAtNode } from "react-dom";

describe('Users', () => {

    let container = null;
    beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    });

    afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    });

  it('Renders login form', async () => {
      const { unmount } = renderWithProviders(
          <Users />,
          { container }
      );
      // expect Login button
        expect(container.querySelector("button").textContent).toBe("Log in");
      unmount();
  })

    it('Should render no songs liked', async () => {
        const user = {username: 'user1', email: 'test@gmail.com'}
        const { getByText } = renderWithProviders(<Users logged={true} userTest={user} />);
        // Check if the user profile is rendered
        expect(getByText('No songs liked yet')).toBeInTheDocument()
    });

    it('Should render user profile', async () => {
        const user = {username: 'user1', email: 'test@gmail.com'}
        const { getByText } = renderWithProviders(<Users logged={true} userTest={user} />);
        // Check if the user profile is rendered
        expect(getByText('Usuario: user1')).toBeInTheDocument()
        expect(getByText('Email: test@gmail.com')).toBeInTheDocument()
    });

    it('Should render sign off', async () => {
        const user = {username: 'user1', email: 'test@gmail.com'}
        const { getByText } = renderWithProviders(<Users logged={true} userTest={user} />);
        // Check if the user profile is rendered
        expect(getByText('Sign off')).toBeInTheDocument()
    });

    it('Should render delete button', async () => {
        const user = {username: 'user1', email: 'test@gmail.com'}
        const { getByText } = renderWithProviders(<Users logged={true} userTest={user} />);
        // Check if the user profile is rendered
        expect(getByText('Delete account')).toBeInTheDocument()
    });

    it ('Should render update button', async () => {
        const user = {username: 'user1', email: 'test@gmail.com'}
        const { getByText } = renderWithProviders(<Users logged={true} userTest={user} />);
        // Check if the user profile is rendered
        expect(getByText('Update data')).toBeInTheDocument()
    });

    it('Should render update form', async () => {
        const user = {username: 'user1', email: 'test@gmail.com'}
        const { getByText } = renderWithProviders(<Users logged={true} userTest={user} />);
        // click Update data button
        fireEvent.click(getByText('Update data'))
        // Check if form is rendered
        expect(getByText('Edit your info')).toBeInTheDocument()
    });

    it('Should render update form EDIT', async () => {
        const user = {username: 'user1', email: 'test@gmail.com'}
        const { getByText } = renderWithProviders(<Users logged={true} userTest={user} />);
        // click Update data button
        fireEvent.click(getByText('Update data'))
        // Check if Edit button is rendered
        expect(getByText('Edit')).toBeInTheDocument()
    });

    it('Should render confirm button when Delete is clicked', async () => {
        const user = {username: 'user1', email: 'test@gmail.com'}
        const { getByText } = renderWithProviders(<Users logged={true} userTest={user} />);
        // click Delete user button
        fireEvent.click(getByText('Delete account'))
        // Check if Confirm button is rendered
        expect(getByText('Confirm')).toBeInTheDocument()
    });

    it('If clicked Sign off, show login form', async () => {
        const user = {username: 'user1', email: 'test@gmail.com'}
        const { getByText } = renderWithProviders(<Users logged={true} userTest={user} />);
        // click Sign off button
        fireEvent.click(getByText('Sign off'))
        // Check if Login button is rendered
        expect(getByText('Log in')).toBeInTheDocument()
    });
    
})
