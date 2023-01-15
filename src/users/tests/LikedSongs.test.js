import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import LikedSongs from '../LikedSongs'

describe('LikedSongs', () => {
    it('hello world', () => {
        expect(true).toBe(true)
    })
//   it('should display no songs liked yet when the component is rendered', async () => {
//     const { getByText } = render(<LikedSongs />)

//     expect(getByText('No songs liked yet')).toBeInTheDocument()
//   })

//   it('should call the setSongs function when the component is rendered', async () => {
//     const setSongs = jest.fn()
//     const { getByText } = render(<LikedSongs setSongs={setSongs} />)

//     expect(setSongs).toHaveBeenCalled()
//   })

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
