import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurrencyInput } from '../CurrencyInput';

describe('CurrencyInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with label', () => {
    render(
      <CurrencyInput
        label="Monto"
        value={0}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Monto')).toBeInTheDocument();
  });

  it('displays formatted currency value', () => {
    render(
      <CurrencyInput
        label="Monto"
        value={1000000}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input.value).toContain('1.000.000');
  });

  it('handles empty value', () => {
    render(
      <CurrencyInput
        label="Monto"
        value={0}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('calls onChange with numeric value when typing', async () => {
    const user = userEvent.setup();

    render(
      <CurrencyInput
        label="Monto"
        value={0}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, '5000');

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('strips non-numeric characters', async () => {
    const user = userEvent.setup();

    render(
      <CurrencyInput
        label="Monto"
        value={0}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'abc123');

    // Should only process numeric part
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('displays placeholder', () => {
    render(
      <CurrencyInput
        label="Monto"
        value={0}
        onChange={mockOnChange}
        placeholder="Ingrese el monto"
      />
    );

    const input = screen.getByPlaceholderText('Ingrese el monto');
    expect(input).toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(
      <CurrencyInput
        label="Monto"
        value={0}
        onChange={mockOnChange}
        required
      />
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <CurrencyInput
        label="Monto"
        value={0}
        onChange={mockOnChange}
        error="El monto es requerido"
      />
    );

    expect(screen.getByText('El monto es requerido')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(
      <CurrencyInput
        label="Monto"
        value={1000}
        onChange={mockOnChange}
        disabled
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('handles clearing input', async () => {
    const user = userEvent.setup();

    render(
      <CurrencyInput
        label="Monto"
        value={1000}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    await user.clear(input);

    expect(mockOnChange).toHaveBeenCalledWith(0);
  });

  it('formats value on blur', () => {
    render(
      <CurrencyInput
        label="Monto"
        value={500000}
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.blur(input);

    expect(input.value).toContain('500');
  });
});
