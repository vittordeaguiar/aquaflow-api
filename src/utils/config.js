export default {
    // Mensagens
    NOT_AUTHENTICATED: 'Usuário não autenticado.',
    USER_NOT_FOUND: 'Usuário não foi encontrado.',
    INVALID_PASSWORD: 'Senha inválida.',
    AUTHENTICATED: 'Usuário autenticado.',
    LOGGED_IN: 'Logou.',
    LOGGED_OUT: 'Deslogou.',
    PASSWORDS_DO_NOT_MATCH: 'As senhas não são iguais.',
    INVALID_EMAIL_ADDRESS: 'Endereço de e-mail inválido.',

    // Regex
    EMAIL_REGEX: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    PASSWORD_REGEX:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};
