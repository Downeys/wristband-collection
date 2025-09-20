import React from 'react';
import BackButton from './BackButton';
import { render, screen } from '@testing-library/react';

describe('Back Button tests', () => {
    test('it should call onClick property when clicked', () => {
        const mockOnClick = jest.fn();
        render(<BackButton onClick={mockOnClick}/>)
        const button = screen.getByRole('button');
        button.click();
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    })
})