import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('mostra o texto "Miolo e Mel"', () => {
    render(<Home />);
    expect(screen.getByText(/Miolo e Mel/)).toBeInTheDocument();
  });
});