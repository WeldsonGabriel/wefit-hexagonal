// Função para validar CPF
export function validateCPF(cpf: string): boolean {
    if (typeof cpf !== 'string') return false;
    
    // Remove espaços, pontos e hífens
    cpf = cpf.replace(/[\s.-]*/g, '');
  
    // CPF deve ter 11 dígitos e não pode ser uma sequência repetida
    if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    let sum = 0;
    let remainder: number;
  
    // Cálculo do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  
    // Cálculo do segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  
    return true;
  }
  
  // Função para validar Email
  export function validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(email.trim().toLowerCase());
  }
  