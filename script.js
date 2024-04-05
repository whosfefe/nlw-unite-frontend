
let participantes = [
  {
    nome: "Fernanda Vieira",
    email: "fernandavieira@gmail.com",
    dataInscricao: new Date(2024, 3, 2, 23, 21),
    dataCheckIn: new Date(2024, 2, 5, 11, 55),
  },
  {
    nome: "Matheus Santos",
    email: "matheus.santos@gmail.com",
    dataInscricao: new Date(2024, 6, 3, 10, 15),
    dataCheckIn: new Date(2024, 2, 6, 9, 30),
  },
  {
    nome: "Larissa Oliveira",
    email: "lara.silva@gmail.com",
    dataInscricao: new Date(2024, 2, 6, 14, 45),
    dataCheckIn: null,
  },
  {
    nome: "Ana Marcela",
    email: "ana.silva@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 18, 30),
    dataCheckIn: null,
  },
  {
    nome: "Pedro Santos",
    email: "pedrosts@gmail.com",
    dataInscricao: new Date(2024, 2, 6, 8, 20),
    dataCheckIn: new Date(2024, 2, 9, 10, 0),
  },
  {
    nome: "Henrique Santos",
    email: "rique.sts@gmail.com",
    dataInscricao: new Date(2024, 2, 7, 12, 10),
    dataCheckIn: null,
  },
  {
    nome: "Thiago Barreto",
    email: "thiago.barreto@gmail.com",
    dataInscricao: new Date(2024, 2, 8, 16, 40),
    dataCheckIn: new Date(2024, 2, 11, 11, 45),
  },
  {
    nome: "Jonas Oliveira",
    email: "jonas.oliver@gmail.com",
    dataInscricao: new Date(2024, 2, 9, 9, 0),
    dataCheckIn: new Date(2024, 2, 12, 14, 30),
  },
  {
    nome: "Marcela Nicole",
    email: "nick.marcela@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 15, 20),
    dataCheckIn: null,
  },
  {
    nome: "Anderson Silva",
    email: "anderson.silva@gmail.com",
    dataInscricao: new Date(2024, 2, 11, 11, 30),
    dataCheckIn: new Date(2024, 2, 14, 16, 0),
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button 
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>${participante.nome}</strong>
      <br>
    <small>${participante.email}</small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()
  
  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null,
  }

  const participanteExiste = participantes.find((p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find((p) => p.email == event.target.dataset.email
  )

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}