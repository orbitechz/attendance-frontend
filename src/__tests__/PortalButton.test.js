import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortalButton from '../components/PortalButton';


test('renders PortalButton with given props', () => {
  render(<PortalButton icon="bi-check" label="Submit" onClick={() => {}} disabled={false} />);
  expect(screen.getByText('Submit')).toBeInTheDocument();
  expect(screen.getByRole('button')).not.toBeDisabled();
  expect(screen.getByRole('button')).toHaveClass('portal-btn');
  expect(screen.getByRole('button')).not.toHaveClass('disabled');
  expect(screen.getByRole('button').querySelector('.portal-icon .bi-check')).toBeInTheDocument();
});

test('button is disabled when disabled prop is true', () => {
  render(<PortalButton icon="bi-check" label="Submit" onClick={() => {}} disabled={true} />);
  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByRole('button')).toHaveClass('disabled');
});

test('calls onClick function when button is clicked', () => {
  const handleClick = jest.fn();
  render(<PortalButton icon="bi-check" label="Submit" onClick={handleClick} disabled={false} />);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});