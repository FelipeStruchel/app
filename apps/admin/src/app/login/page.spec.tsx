import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from './page';

// Pacote do Firebase falso: cada função é uma espiã que devolve o que o teste quiser.
const { signInWithGoogle, signOutUser, getIdToken } = vi.hoisted(() => ({
  signInWithGoogle: vi.fn(),
  signOutUser: vi.fn(),
  getIdToken: vi.fn(),
}));
vi.mock('@miolo-e-mel/firebase-client', () => ({
  signInWithGoogle,
  signOutUser,
  getIdToken,
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getIdToken.mockResolvedValue('token-de-teste');
  });

  it('mostra os botões de login com Google', () => {
    render(<LoginPage />);

    expect(screen.getByText('Entrar com Google')).toBeInTheDocument();
  });

  it('mostra o e-mail depois de entrar com o Google, e volta ao sair', async () => {
    signInWithGoogle.mockResolvedValue({ email: 'ana@exemplo.com' });
    render(<LoginPage />);

    fireEvent.click(screen.getByText('Entrar com Google'));

    expect(await screen.findByText('Logado como ana@exemplo.com')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Sair'));

    expect(await screen.findByText('Entrar com Google')).toBeInTheDocument();
    expect(signOutUser).toHaveBeenCalled();
  });

  it('mostra uma mensagem quando o login falha', async () => {
    signInWithGoogle.mockRejectedValue(new Error('popup fechado'));
    render(<LoginPage />);

    fireEvent.click(screen.getByText('Entrar com Google'));

    expect(await screen.findByRole('alert')).toHaveTextContent('Não foi possível entrar');
  });
});
