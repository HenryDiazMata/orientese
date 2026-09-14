// ==========================================
// LISTAS DEL CADASTRO DE PROFISSIONAIS
// ==========================================

export const PAISES = [
  { id: 'BR', label: 'Brasil', doc: 'CPF' },
  { id: 'PT', label: 'Portugal', doc: 'NIF / NIPC' },
  { id: 'ES', label: 'España', doc: 'NIF / CIF' },
  { id: 'FR', label: 'France', doc: 'SIRET / TVA' },
  { id: 'IT', label: 'Italia', doc: 'Partita IVA' },
  { id: 'US', label: 'United States', doc: 'EIN / Tax ID' },
  { id: 'MX', label: 'México', doc: 'RFC' },
  { id: 'AR', label: 'Argentina', doc: 'CUIT / CUIL' },
  { id: 'CO', label: 'Colombia', doc: 'NIT' },
  { id: 'CL', label: 'Chile', doc: 'RUT' },
  { id: 'PE', label: 'Perú', doc: 'RUC' },
  { id: 'PY', label: 'Paraguay', doc: 'RUC' },
  { id: 'UY', label: 'Uruguay', doc: 'RUT' },
  { id: 'OTHER', label: 'Other / Otro / Autre / Altro', doc: 'Tax ID local' },
];

export const FORMACION_ACADEMICA = [
  { id: 'eng_agronomica', label: 'Engenharia agronômica' },
  { id: 'eng_florestal', label: 'Engenharia florestal / ambiental' },
  { id: 'eng_civil', label: 'Engenharia civil / infraestrutura' },
  { id: 'eng_minas', label: 'Engenharia de minas / geologia' },
  { id: 'eng_eletrica', label: 'Engenharia elétrica / telecom' },
  { id: 'eng_mecanica', label: 'Engenharia mecânica / mecatrônica' },
  { id: 'eng_computacao', label: 'Engenharia de computação / dados' },
  { id: 'arquitetura', label: 'Arquitetura / urbanismo' },
  { id: 'medicina_vet', label: 'Medicina veterinária / zootecnia' },
  { id: 'medicina', label: 'Medicina / saúde ocupacional' },
  { id: 'direito', label: 'Direito / leis / compliance' },
  { id: 'geografia', label: 'Geografia / GIS / geotecnologia' },
  { id: 'cartografia', label: 'Cartografia / fotogrametria' },
  { id: 'meteorologia', label: 'Meteorologia' },
  { id: 'quimica', label: 'Química / agronomia química' },
  { id: 'administracao', label: 'Administração / economia / contábeis' },
  { id: 'comunicacao', label: 'Comunicação / jornalismo / marketing' },
  { id: 'outro_academico', label: 'Outro (acadêmico)' },
];

export const FORMACION_TECNICA = [
  { id: 'eletronica', label: 'Eletrônica' },
  { id: 'eletricidade', label: 'Eletricidade' },
  { id: 'informatica', label: 'Informática / TI' },
  { id: 'topografia', label: 'Topografia / agrimensura' },
  { id: 'seguranca_trabalho', label: 'Segurança do trabalho' },
  { id: 'inspecao', label: 'Inspeção visual / NDT / integridade' },
  { id: 'quimica_tec', label: 'Técnico químico / defensivos' },
  { id: 'ambiental_tec', label: 'Técnico ambiental' },
  { id: 'edificacoes', label: 'Edificações / desenho técnico' },
  { id: 'logistica_tec', label: 'Logística / almoxarifado' },
  { id: 'telecom', label: 'Telecomunicações / rádio' },
  { id: 'audiovisual', label: 'Audiovisual / foto / vídeo (não piloto)' },
  { id: 'processamento_dados', label: 'Processamento de imagens e dados' },
  { id: 'emergencia', label: 'Emergência / bombeiro civil' },
  { id: 'outro_tecnico', label: 'Outro (técnico)' },
];

export const FORMACION_BASICA = [
  { id: 'pedreiro', label: 'Pedreiro / obra civil' },
  { id: 'pintor', label: 'Pintor / trabalho em altura' },
  { id: 'soldador', label: 'Soldador / serralheiro' },
  { id: 'eletricista', label: 'Eletricista de campo' },
  { id: 'motorista', label: 'Motorista' },
  { id: 'peao', label: 'Peão / operário / braçal' },
  { id: 'tratorista', label: 'Tratorista / operador de máquinas' },
  { id: 'vigilante', label: 'Vigilante / porteiro' },
  { id: 'almoxarife', label: 'Almoxarife / carga e descarga' },
  { id: 'limpeza', label: 'Limpeza / higienização' },
  { id: 'cozinha', label: 'Cozinha / hotelaria de campo' },
  { id: 'auxiliar_geral', label: 'Auxiliar geral / serviços gerais' },
  { id: 'outro_basico', label: 'Outro (básico)' },
];

export const AREAS_SERVICO = [
  { id: 'agro_pulverizacao', label: 'Agricultura / pulverização / laudo agronômico' },
  { id: 'pecuaria', label: 'Pecuária / contagem / sanidade' },
  { id: 'floresta', label: 'Floresta / meio ambiente / incêndio' },
  { id: 'mapeamento', label: 'Mapeamento / topografia / GIS' },
  { id: 'fotogrametria', label: 'Fotogrametria / ortomosaico / nuvem de pontos' },
  { id: 'inspecao_linhas', label: 'Inspeção de linhas, torres e energia' },
  { id: 'inspecao_obras', label: 'Inspeção de obras, pontes e fachadas' },
  { id: 'mineracao', label: 'Mineração / pedreira / volume de pilha' },
  { id: 'oil_gas', label: 'Óleo, gás e dutos' },
  { id: 'filmagem', label: 'Filmagem / foto / publicidade / eventos' },
  { id: 'imobiliario', label: 'Imobiliário / turismo / patrimônio' },
  { id: 'seguranca', label: 'Segurança de perímetro / fazenda / evento' },
  { id: 'emergencia', label: 'Emergência / busca e salvamento / defesa civil' },
  { id: 'infra', label: 'Construção / infraestrutura / urbanismo' },
  { id: 'logistica', label: 'Logística / transporte de equipe e carga leve' },
  { id: 'dados', label: 'Processamento de dados / relatórios / dashboards' },
  { id: 'ensino', label: 'Ensino teórico / consultoria / perícia' },
  { id: 'juridico', label: 'Licenças, seguros e compliance' },
  { id: 'servicos_gerais', label: 'Serviços gerais no entorno da operação' },
  { id: 'outro_area', label: 'Outro' },
];

export const VINCULOS = [
  { id: 'autonomo', label: 'Autônomo' },
  { id: 'pj', label: 'PJ / nota fiscal' },
  { id: 'clt', label: 'CLT / carteira' },
  { id: 'diaria', label: 'Diária' },
  { id: 'temporada', label: 'Safra / temporada' },
  { id: 'busca_vaga', label: 'Busco vaga' },
];

export const DISPONIBILIDADES = [
  { id: 'imediata', label: 'Imediata' },
  { id: 'semana', label: 'Dias úteis' },
  { id: 'fds', label: 'Finais de semana' },
  { id: 'consulta', label: 'Sob consulta' },
  { id: 'viagem', label: 'Aceito viajar / pernoite' },
  { id: 'turno_noite', label: 'Aceito turno noturno' },
];

export const IDIOMAS = [
  { id: 'pt', label: 'Português' },
  { id: 'es', label: 'Español' },
  { id: 'en', label: 'English' },
  { id: 'fr', label: 'Français' },
  { id: 'it', label: 'Italiano' },
];

export const NIVEIS_EXP = [
  { id: 'iniciante', label: 'Iniciante / auxiliar' },
  { id: 'pleno', label: 'Pleno' },
  { id: 'senior', label: 'Sênior / especialista' },
];