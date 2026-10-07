import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  // `canActivate` é o método que o Nest chama ANTES de executar a rota. Se devolver `true`,
  // a requisição segue até o controller; se lançar uma exceção (ou devolver `false`), a rota
  // não é executada e o cliente recebe o erro.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // O `context` descreve a execução atual sem saber o tipo da aplicação: o Nest também roda
    // guards em WebSocket e microserviços. `switchToHttp()` diz "estou num contexto HTTP" e
    // `getRequest()` entrega a requisição (com `headers`, `body`...), de onde lemos o token.
    const request = context.switchToHttp().getRequest();
    const header: string | undefined = request.headers['authorization'];

    // Espera "Authorization: Bearer <token>".
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    try {
      // O Firebase confere assinatura, validade e projeto do token. Devolve os dados (uid, email...).
      request.user = await getAuth().verifyIdToken(header.slice('Bearer '.length));
      return true;
    } catch {
      throw new UnauthorizedException(); // token inválido ou expirado
    }
  }
}
