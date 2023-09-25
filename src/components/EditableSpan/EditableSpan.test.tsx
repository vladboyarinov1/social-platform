import { render, fireEvent, screen } from '@testing-library/react';
import { EditableSpan } from './EditableSpan';
import '@testing-library/jest-dom/extend-expect'; // Добавьте эту строку

describe('EditableSpan', () => {
    it('renders the initial status correctly', () => {
        const status = 'Initial Status';
        render(<EditableSpan status={status} updateStatus={() => {}} />);
        const statusElement = screen.getByText(status);

        expect(statusElement).toBeInTheDocument();
    });

    it('triggers edit mode on double click', () => {
        const status = 'Initial Status';
        render(<EditableSpan status={status} updateStatus={() => {}} />);
        const statusElement = screen.getByText(status);

        fireEvent.doubleClick(statusElement);

        const inputElement = screen.getByDisplayValue(status);
        expect(inputElement).toBeInTheDocument();
    });

    it('updates status on blur', () => {
        const status = 'Initial Status';
        const updatedStatus = 'Updated Status';
        const updateStatusMock = jest.fn();
        render(<EditableSpan status={status} updateStatus={updateStatusMock} />);
        const statusElement = screen.getByText(status);

        fireEvent.doubleClick(statusElement);

        const inputElement = screen.getByDisplayValue(status);
        fireEvent.change(inputElement, { target: { value: updatedStatus } });
        fireEvent.blur(inputElement);

        expect(updateStatusMock).toHaveBeenCalledWith(updatedStatus);
    });
});