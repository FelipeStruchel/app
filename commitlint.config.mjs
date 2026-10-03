// Padrão "Conventional Commits": tipo(escopo opcional): assunto
// Tipos aceitos: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert.
// Ex.: "feat(api): criar rota de saúde", "fix: corrigir cálculo da taxa".
// Regra local: o assunto precisa dizer O QUE mudou. Recusa frases vazias como "implementado e testado",
// "ajustes", "correções" ou "wip", que não ajudam quem lê o histórico.
const ASSUNTO_VAGO =
  /^(implementad[oa]s?|testad[oa]s?|ajustes?|corre(ç|c)(ão|ões|ao|oes)|alterações|alteracoes|mudanças|mudancas|wip|update|updates|changes?|fix|fixes|feito|pronto|ok)(\s+e\s+(implementad[oa]s?|testad[oa]s?))?\.?$/i;

export default {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'subject-not-vague': ({ subject }) => [
          !subject || !ASSUNTO_VAGO.test(subject.trim()),
          'o assunto é vago: diga o que mudou e onde, ex.: "criar rota /health no api"',
        ],
      },
    },
  ],
  rules: {
    // Assuntos em português: não exige uma capitalização específica (o padrão rejeitaria "Criar ...").
    'subject-case': [0],
    // Mensagens geradas por bots (Dependabot) têm corpo e rodapé com linhas longas.
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
    // O assunto precisa ter pelo menos 15 caracteres e não pode ser uma frase vaga.
    'subject-min-length': [2, 'always', 15],
    'subject-not-vague': [2, 'always'],
    // Cabeçalho (primeira linha) com até 100 caracteres.
    'header-max-length': [2, 'always', 100],
  },
};
