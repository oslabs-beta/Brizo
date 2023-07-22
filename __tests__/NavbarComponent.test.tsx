import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavbarComponent from '../src/client/components/NavbarComponent';
// import ViewStructure from '../src/client/componenets/ViewStructure';
import { MemoryRouter } from 'react-router-dom';
// import axios from 'axios';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// outline objectives of group of tests
describe('checking rendering', () => {
	// outline objecties of test
	test('button with text', () => {
		// Arrange: prepare environment by rendering the component we're testing
		render(
			<MemoryRouter>
				<NavbarComponent />
			</MemoryRouter>
		);

		// Act: look for anticipated result
		const structureNavButton = screen.getByText(/structure/i);

		// Assert: check that the document contains the button with the text

		expect(structureNavButton).toBeInTheDocument();
	});

	test('three buttons render', () => {
		// Arrange: prepare environment by rendering the component we're testing
		render(
			<MemoryRouter>
				<NavbarComponent />
			</MemoryRouter>
		);

		// Act: look for anticipated result
		const buttons = document.querySelectorAll('button');

		//Assert: check that the document contains 4 buttons

		expect(buttons).toHaveLength(4);
	});


});
