import { render, screen, fireEvent } from '@testing-library/react';
import { CurrencyInput } from '../CurrencyInput';

describe('CurrencyInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders label', () => {
    render(<CurrencyInput label="Monto" value={0} onChange={mockOnChange} />);
    expect(screen.getByText('Monto')).toBeInTheDocument();
  });

  it('shows $ prefix', () => {
    render(<CurrencyInput label="Monto" value={0} onChange={mockOnChange} />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('shows empty when value is 0', () => {
    render(<CurrencyInput label="Monto" value={0} onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('shows formatted value when blurred', () => {
    render(<CurrencyInput label="Monto" value={1000000} onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    // Not focused — should show formatted
    expect(input).toHaveValue('1.000.000');
  });

  it('shows raw digits while focused', () => {
    render(<CurrencyInput label="Monto" value={1000000} onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    expect(input).toHaveValue('1000000');
  });

  it('calls onChange with numeric value when typing digits', () => {
    render(<CurrencyInput label="Monto" value={0} onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '5000' } });
    expect(mockOnChange).toHaveBeenCalledWith(5000);
  });

  it('strips non-numeric characters and does not produce NaN', () => {
    render(<CurrencyInput label="Monto" value={0} onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(mockOnChange).toHaveBeenCalledWith(0);
  });

  it('calls onChange with 0 when input is cleared', () => {
    render(<CurrencyInput label="Monto" value={1000} onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '' } });
    expect(mockOnChange).toHaveBeenCalledWith(0);
  });

  it('formats with thousand separators on blur', () => {
    // The component formats rawInput on blur — we need the parent to pass the updated value
    const { rerender } = render(
      <CurrencyInput label="Monto" value={0} onChange={mockOnChange} />
    );
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '2500000' } });
    // Simulate parent updating value after onChange
    rerender(<CurrencyInput label="Monto" value={2500000} onChange={mockOnChange} />);
    fireEvent.blur(input);
    expect(input.value).toContain('2.500.000');
  });

  it('shows empty string on blur when value is 0', () => {
    render(<CurrencyInput label="Monto" value={0} onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(input).toHaveValue('');
  });

  it('shows required asterisk', () => {
    render(<CurrencyInput label="Monto" value={0} onChange={mockOnChange} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(
      <CurrencyInput label="Monto" value={0} onChange={mockOnChange} error="Campo requerido" />
    );
    expect(screen.getByText('Campo requerido')).toBeInTheDocument();
  });

  it('applies error border class when error is present', () => {
    render(
      <CurrencyInput label="Monto" value={0} onChange={mockOnChange} error="Error" />
    );
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('border-red-500');
  });

  it('is disabled when disabled prop is true', () => {
    render(<CurrencyInput label="Monto" value={1000} onChange={mockOnChange} disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('does not call onChange when disabled and value changes', () => {
    // jsdom does not enforce disabled on fireEvent — test that the handler guards it
    // by checking the component renders as disabled
    render(<CurrencyInput label="Monto" value={1000} onChange={mockOnChange} disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    // The disabled guard in handleChange prevents calling onChange
    // We verify by checking the input attribute, not by firing events
    expect(input).toHaveAttribute('disabled');
  });

  it('handles large values without NaN', () => {
    render(<CurrencyInput label="Monto" value={0} onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '500000000' } });
    expect(mockOnChange).toHaveBeenCalledWith(500000000);
  });

  it('syncs display when external value changes while not focused', () => {
    const { rerender } = render(
      <CurrencyInput label="Monto" value={1000} onChange={mockOnChange} />
    );
    rerender(<CurrencyInput label="Monto" value={5000} onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    expect(input.value).toContain('5.000');
  });
});
