import React from 'react';
import { render, screen } from '@testing-library/react';
import NavbarComponent from '../src/client/components/NavbarComponent';
import { MemoryRouter } from 'react-router-dom';

// outline objectives of group of tests
describe('checking rendering', () => {
	// outline objecties of test
	test('renders main container on load', () => {
		// Arrange: prepare environment by rendering the component we're testing
		render(
			<MemoryRouter>
				<NavbarComponent />
			</MemoryRouter>
		);

		// Act: look for anticipated result
		const structureNavButton = screen.getByText(/structure/i);

		// Assert: check that the document contains the butto with the text

		// expect(structureNavButton).toBeInTheDocument()
		expect(structureNavButton).toBeInTheDocument();
	});
});
