export const environment = {
  production: true,
  sigaServer: 'http://localhost:8000/public',
  urlStorageAPI: 'http://localhost:8000/public/storage',
  encryptSymbols: ['%', '<', '>'],
  encryptLevel: 10,
  decryptLevel: 10,
  validatorPatterns: {
    cnh: {
      pattern: /^\d{11}$/,
      message: 'Informe uma CNH no formato: ###########',
    },
    currency: {
      pattern: /^(\R\$ ([1-9]\d*){1,3}(\.\d{3})*)(\,\d{2})?$/,
      message: 'Valor inválido. Ex.: R$ 1.000,01',
    },
    rg: {
      pattern: /^\d{2}\.\d{3}\.\d{3}[-][0-9]{2}$/,
      message: 'Informe um RG no formato: ##.###.###-##',
    },
    cpf: {
      pattern: /^\d{3}\.\d{3}\.\d{3}[-][0-9]{2}$/,
      message: 'Informe um CPF no formato: ###.###.###-##',
    },
    ctps: {
      pattern: /^\d{3}\.\d{5}\.\d{2}[-][0-9]{1}$/,
      message: 'Informe um CTPS no formato: ###.#####.##-#',
    },
    voterRegistration: {
      pattern: /^\d{4}\s\d{4}\s\d{4}$/,
      message: 'Informe um titulo no formato: #### #### ####',
    },
    electoralZone: {
      pattern: /^\d{4}$/,
      message: 'Informe uma zona no formato: ####',
    },
    militaryCertification: {
      pattern: /^\d{2}\.\d{3}\.\d{6}\.\d{1}$/,
      message: 'Informe uma certificação no formato: ##.###.######.#',
    },
    esocial: {
      pattern: /^\d{4}\.\d{6}$/,
      message: 'Informe um esocial no formato: ####.######',
    },
    image: {
      pattern: 'image/png',
      message: 'A Foto deve ser PNG',
    },
    pdf: {
      pattern: 'application/pdf',
      message: 'O aquivo deve ser PDF',
    },
    fileSize: {
      pattern: 4000000,
      message: 'O aquivo deve ter no máximo 4MB',
    },
    date: {
      pattern: {
        US: /(\d{4})-(\d{2})-\d{2}/,
        BR: /(\d{2})-(\d{2})-\d{4}/,
        conventionalBR: /(\d{2})\/(\d{2})\/\d{4}/,
      },
      message: {
        US: 'Informe a data no formato YYYY-MM-DD',
        BR: 'Informe a data no formato DD-MM-YYYY',
        conventionalBR: 'Informe a data no formato DD/MM/YYYY',
      },
    },
    dateTime: {
      pattern: {
        US: /(\d{4})-(\d{2})-\d{2} (\d{2}):(\d{2}):\d{2}/,
        BR: /(\d{2})-(\d{2})-\d{4} (\d{2}):(\d{2}):\d{2}/,
        conventionalBR: /(\d{2})\/(\d{2})\/\d{4} (\d{2}):(\d{2}):\d{2}/,
      },
      message: {
        US: 'Informe a data no formato YYYY-MM-DD HH:MM:SS',
        BR: 'Informe a data no formato DD-MM-YYYY HH:MM:SS',
        conventionalBR: 'Informe a data no formato DD/MM/YYYY HH:MM:SS',
      },
    },
    time: {
      pattern: /(\d{2}):(\d{2})/,
      message: 'Informe um horário no formato: HH:MM',
    },
  },
};
