import { type ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard.js';

// Função espiã criada antes do vi.mock (que é "içado" para o topo do arquivo).
const { verifyIdToken } = vi.hoisted(() => ({ verifyIdToken: vi.fn() }));
vi.mock('firebase-admin/auth', () => ({ getAuth: () => ({ verifyIdToken }) }));

// Monta um contexto falso com um header Authorization opcional; devolve também a request para inspecionarmos.
function criarContexto(authorization?: string) {
  const request: { headers: Record<string, string>; user?: unknown } = {
    headers: authorization ? { authorization } : {},
  };
  const context = {
    switchToHttp: () => ({ getRequest: () => request }),
  } as unknown as ExecutionContext;
  return { context, request };
}

describe('AuthGuard', () => {
  const guard = new AuthGuard();

  beforeEach(() => {
    verifyIdToken.mockReset();
  });

  it('libera token válido e coloca os dados em request.user', async () => {
    verifyIdToken.mockResolvedValue({ uid: 'uid-1', email: 'ana@exemplo.com' });
    const { context, request } = criarContexto('Bearer token-bom');

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(verifyIdToken).toHaveBeenCalledWith('token-bom');
    expect(request.user).toEqual({ uid: 'uid-1', email: 'ana@exemplo.com' });
  });

  it('rejeita token inválido com 401', async () => {
    verifyIdToken.mockRejectedValue(new Error('token expirado'));
    const { context } = criarContexto('Bearer token-ruim');

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rejeita requisição sem token com 401', async () => {
    const { context } = criarContexto();

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(UnauthorizedException);
    expect(verifyIdToken).not.toHaveBeenCalled();
  });
});
