import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('mostra o texto "Painel administrativo"', () => {
    render(<Home />);
    expect(screen.getByText(/Painel administrativo/)).toBeInTheDocument();
  });
});