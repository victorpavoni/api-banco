    Endpoint: /api/login
        Método: POST
        Descrição: Autentica um usuário e fornece um token de acesso para interagir com outras rotas protegidas.
        Parâmetros:
            username: Nome de usuário do cliente.
            password: Senha do cliente.
        Resposta:
            200 OK: Token de acesso válido.
            401 Unauthorized: Credenciais inválidas.

    Endpoint: /api/accounts
        Método: GET
        Descrição: Obtém informações da conta bancária do cliente.
        Cabeçalho:
            Authorization: Token de acesso do cliente.
        Resposta:
            200 OK: Detalhes da conta bancária do cliente.
            401 Unauthorized: Token de acesso inválido.

    Endpoint: /api/accounts/transactions
        Método: GET
        Descrição: Obtém as últimas transações realizadas na conta do cliente.
        Cabeçalho:
            Authorization: Token de acesso do cliente.
        Parâmetros:
            limit (opcional): Limita o número de transações retornadas (padrão: 10).
        Resposta:
            200 OK: Lista das últimas transações.
            401 Unauthorized: Token de acesso inválido.

    Endpoint: /api/accounts/deposit
        Método: POST
        Descrição: Realiza um depósito na conta do cliente.
        Cabeçalho:
            Authorization: Token de acesso do cliente.
        Parâmetros:
            amount: Valor a ser depositado.
        Resposta:
            200 OK: Depósito bem-sucedido.
            401 Unauthorized: Token de acesso inválido.

    Endpoint: /api/accounts/withdraw
        Método: POST
        Descrição: Realiza um saque na conta do cliente.
        Cabeçalho:
            Authorization: Token de acesso do cliente.
        Parâmetros:
            amount: Valor a ser sacado.
        Resposta:
            200 OK: Saque bem-sucedido.
            401 Unauthorized: Token de acesso inválido.
            403 Forbidden: Saldo insuficiente para o saque.

    Endpoint: /api/accounts/transfer
        Método: POST
        Descrição: Realiza uma transferência entre contas do mesmo banco.
        Cabeçalho:
            Authorization: Token de acesso do cliente.
        Parâmetros:
            recipient_account: Número da conta de destino.
            amount: Valor a ser transferido.
        Resposta:
            200 OK: Transferência bem-sucedida.
            401 Unauthorized: Token de acesso inválido.
            403 Forbidden: Saldo insuficiente para a transferência.
            404 Not Found: Conta de destino não encontrada.
