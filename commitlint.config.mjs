// Padrão "Conventional Commits": tipo(escopo opcional): assunto
// Tipos aceitos: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert.
// Ex.: "feat(api): criar rota de saúde", "fix: corrigir cálculo da taxa".
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Assuntos em português: não exige uma capitalização específica (o padrão rejeitaria "Criar ...").
    'subject-case': [0],
    // Mensagens geradas por bots (Dependabot) têm corpo e rodapé com linhas longas.
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
    // Cabeçalho (primeira linha) com até 100 caracteres.
    'header-max-length': [2, 'always', 100],
  },
};
