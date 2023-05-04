# Cadastro de carros

**RF**
- Deve ser possível cadastrar um novo carro.
- Deve ser possível listar todas as categorias.

**RN**
- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado com disponibilidade por padrão.
Apenas usuários administradores devem ter permissão para realizar o cadastro de carros.

# Listagem de carros

**RF**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
- O usuário não precisa estar logado no sistema.

# Cadastro de especificação de um carro

**RF**
- Deve ser possível cadastrar uma especificação para um carro.

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- Apenas usuários administradores devem ter permissão para realizar o cadastro de especificações.

# Cadastro de imagens de um carro

**RF**
- Deve ser possível cadastrar a imagem de um carro.
- Deve ser possível listar todos os carros.

**RNF**
- Utilizar o multer para upload dos arquivos.

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- Apenas usuários administradores devem ter permissão para realizar o cadastro de imagens.

# Aluguel de carros

**RF**
- Deve ser possível realizar um aluguel de um carro.

**RN**
- O aluguel deve ter duração miníma de 24 horas.
- Não deve ser possível realizar o aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível realizar o aluguel caso já exista um aberto para o mesmo carro.
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução de carros

**RF**
- Deve ser possível realizar a devolução de um carro.

**RN**
- Se o carro for devolvido com menos de 24h, deverá ser cobrado diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deve estar disponível para outro aluguel.
- Ao realizar a devolução, deve ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deve ser cobrado uma multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.

# Listagem de alugueis para usuário

**RF**
Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**