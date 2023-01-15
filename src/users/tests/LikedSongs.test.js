import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import LikedSongs from '../LikedSongs'
import { unmountComponentAtNode } from "react-dom";
import { renderWithProviders } from '../../utils/test-utils'

describe('Liked songs', () => {

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

  it('No liked songs', async () => {
      const { unmount } = renderWithProviders(
          <LikedSongs />,
          { container }
      );
      //expect text No songs liked yet in div "buenas"
    expect(container.querySelector("div").textContent).toBe("No songs liked yet");
      unmount();
  })

//   it('should call the setError function when an error occurs', async () => {
//     const setError = jest.fn()
//     const { getByText } = render(<LikedSongs setError={setError} />)

//     expect(setError).toHaveBeenCalled()
//   })

//   it('should display the list of liked songs when songs are present', async () => {
//     const { getByText } = render(<LikedSongs songs={[{song: {name: 'song1'}}]} />)

//     expect(getByText('song1')).toBeInTheDocument()
//   })
})
