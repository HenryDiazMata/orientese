import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traducciones centralizadas para evitar conflictos con archivos externos
const resources = {
  // 1. PORTUGUÊS (PT-BR)
  'pt-BR': {
    translation: {
      header: {
        tagline: "Informações úteis para orientar suas decisões",
        home: "Início",
        about: "Sobre Nós",
        subdomains: "Subdomínios",
        login: "Entrar",
        register: "Cadastrar"
      },
      hero: {
        title: "Portal Orientese",
        subtitle: "Um ecossistema de subdomínios especializados para informar de maneira útil e agradável."
      },
      footer: {
        rights: "Todos os direitos reservados.",
        credits: "Informações úteis para orientar suas decisões"
      },
      subdomains: {
        accessButton: "Acessar site",
        comingSoon: "Em preparação",
        drones: {
          description: "Simulador de orçamentos, diretório de pilotos, técnicos e serviços do setor."
        },
        mentora: {
          description: "Orientação em responsabilidade social e incentivos fiscais para pequenas, médias e grandes empresas."
        },
        standshowtour: {
          description: "Promoção empresarial, comercial e turística integrando realidade aumentada."
        },
        ofertas: {
          description: "Publicação de ofertas lícitas e capacitação comercial para empresários."
        },
        empleos: {
          description: "Conexão direta entre profissionais que oferecem serviços e contratantes."
        },
        ondesp: {
          description: "Guia útil e informativo sobre serviços, comércio e investimento em São Paulo."
        }
      },
      common: {
        back: "Voltar ao início",
        backHome: "← Voltar ao início"
      },
      auth: {
        info: {
          subtitle: "Acesse ferramentas de cálculo, diretórios profissionais e conteúdos especializados em nossos subdomínios com um único usuário e senha."
        },
        form: {
          loginTitle: "Entrar",
          registerTitle: "Criar Conta",
          loginSubtitle: "Acesse sua conta com e-mail e senha",
          registerSubtitle: "Insira seus dados abaixo",
          fullNameLabel: "Nome completo",
          fullNamePlaceholder: "Seu nome",
          emailLabel: "E-mail",
          passwordLabel: "Senha",
          confirmPasswordLabel: "Confirmar senha",
          forgotPassword: "Esqueceu sua senha?",
          loginButton: "Entrar",
          registerButton: "Cadastrar"
        },
        errors: {
          shortPassword: "A senha deve ter pelo menos 6 caracteres.",
          passwordMismatch: "As senhas não coincidem."
        },
        switch: {
          hasAccount: "Já tem uma conta?",
          noAccount: "Ainda não tem uma conta?",
          loginBtn: "Entrar",
          registerBtn: "Cadastrar-se"
        }
      }
    }
  },

  // 2. CASTELLANO (ES)
  es: {
    translation: {
      header: {
        tagline: "Información útil para orientar tus decisiones",
        home: "Inicio",
        about: "Sobre Nosotros",
        subdomains: "Subdominios",
        login: "Entrar",
        register: "Cadastrar"
      },
      hero: {
        title: "Portal Orientese",
        subtitle: "Un ecosistema de subdominios especializados para informar de manera útil y agradable."
      },
      footer: {
        rights: "Todos los derechos reservados.",
        credits: "Información útil para orientar tus decisiones"
      },
      subdomains: {
        accessButton: "Acceder al sitio",
        comingSoon: "En preparación",
        drones: {
          description: "Simulador de orçamentos, directorio de pilotos, técnicos y servicios del sector."
        },
        mentora: {
          description: "Orientación en responsabilidad social e incentivos fiscales para pequeñas, medianas y grandes empresas."
        },
        standshowtour: {
          description: "Promoción empresarial, comercial y turística integrando realidad aumentada."
        },
        ofertas: {
          description: "Publicación de ofertas lícitas y capacitación comercial para empresarios."
        },
        empleos: {
          description: "Conexión directa entre profesionales que ofrecen servicios y contratantes."
        },
        ondesp: {
          description: "Guía útil e informativa sobre servicios, comercio e inversión en São Paulo."
        }
      },
      common: {
        back: "Volver al inicio",
        backHome: "← Volver al inicio"
      },
      auth: {
        info: {
          subtitle: "Accede a herramientas de cálculo, directorios profesionales y contenidos especializados en nuestros subdominios con un solo usuario y contraseña."
        },
        form: {
          loginTitle: "Iniciar Sesión",
          registerTitle: "Crear Cuenta",
          loginSubtitle: "Accede a tu cuenta con correo y contraseña",
          registerSubtitle: "Ingresa tus datos a continuación",
          fullNameLabel: "Nombre completo",
          fullNamePlaceholder: "Tu nombre",
          emailLabel: "Correo electrónico",
          passwordLabel: "Contraseña",
          confirmPasswordLabel: "Confirmar contraseña",
          forgotPassword: "¿Olvidaste tu contraseña?",
          loginButton: "Iniciar Sesión",
          registerButton: "Registrarse"
        },
        errors: {
          shortPassword: "La contraseña debe tener al menos 6 caracteres.",
          passwordMismatch: "Las contraseñas no coinciden."
        },
        switch: {
          hasAccount: "¿Ya tienes una cuenta?",
          noAccount: "¿Aún no tienes una cuenta?",
          loginBtn: "Iniciar Sesión",
          registerBtn: "Registrarse"
        }
      }
    }
  },

  // 3. ENGLISH (EN)
  en: {
    translation: {
      header: {
        tagline: "Useful information to guide your decisions",
        home: "Home",
        about: "About Us",
        subdomains: "Subdomains",
        login: "Log In",
        register: "Register"
      },
      hero: {
        title: "Orientese Portal",
        subtitle: "An ecosystem of specialized subdomains designed to inform in a useful and pleasant way."
      },
      footer: {
        rights: "All rights reserved.",
        credits: "Useful information to guide your decisions"
      },
      subdomains: {
        accessButton: "Access site",
        comingSoon: "Coming Soon",
        drones: {
          description: "Budget simulator, pilots directory, technicians, and industry services."
        },
        mentora: {
          description: "Guidance on social responsibility and tax incentives for small, medium, and large companies."
        },
        standshowtour: {
          description: "Business, commercial, and tourism promotion integrating augmented reality."
        },
        ofertas: {
          description: "Publication of lawful offers and commercial training for business owners."
        },
        empleos: {
          description: "Direct connection between professionals offering services and recruiters."
        },
        ondesp: {
          description: "Useful and informative guide about services, trade, and investment in São Paulo."
        }
      },
      common: {
        back: "Back to home",
        backHome: "← Back to home"
      },
      auth: {
        info: {
          subtitle: "Access calculation tools, professional directories, and specialized content across our subdomains with a single username and password."
        },
        form: {
          loginTitle: "Log In",
          registerTitle: "Create Account",
          loginSubtitle: "Access your account with email and password",
          registerSubtitle: "Enter your details below",
          fullNameLabel: "Full Name",
          fullNamePlaceholder: "Your name",
          emailLabel: "Email",
          passwordLabel: "Password",
          confirmPasswordLabel: "Confirm Password",
          forgotPassword: "Forgot your password?",
          loginButton: "Log In",
          registerButton: "Register"
        },
        errors: {
          shortPassword: "Password must be at least 6 characters long.",
          passwordMismatch: "Passwords do not match."
        },
        switch: {
          hasAccount: "Already have an account?",
          noAccount: "Don't have an account yet?",
          loginBtn: "Log In",
          registerBtn: "Sign Up"
        }
      }
    }
  },

  // 4. FRANÇAIS (FR)
  fr: {
    translation: {
      header: {
        tagline: "Des informations utiles pour guider vos décisions",
        home: "Accueil",
        about: "À propos",
        subdomains: "Sous-domaines",
        login: "Connexion",
        register: "S'inscrire"
      },
      hero: {
        title: "Portail Orientese",
        subtitle: "Un écosystème de sous-domaines spécialisés pour informer de manière utile et agréable."
      },
      footer: {
        rights: "Tous droits réservés.",
        credits: "Des informations utiles pour guider vos décisions"
      },
      subdomains: {
        accessButton: "Accéder au site",
        comingSoon: "En préparation",
        drones: {
          description: "Simulateur de devis, annuaire de pilotes, techniciens et services du secteur."
        },
        mentora: {
          description: "Conseil en responsabilité sociale et incitations fiscales pour les entreprises."
        },
        standshowtour: {
          description: "Promotion commerciale et touristique intégrant la réalité augmentée."
        },
        ofertas: {
          description: "Publication d'offres légales et formation commerciale pour entrepreneurs."
        },
        empleos: {
          description: "Connexion directe entre professionnels et recruteurs sans intermédiaires."
        },
        ondesp: {
          description: "Guide pratique sur les services, le commerce et les investissements à São Paulo."
        }
      },
      common: {
        back: "Retour à l'accueil",
        backHome: "← Retour à l'accueil"
      },
      auth: {
        info: {
          subtitle: "Accédez aux outils de calcul, aux annuaires professionnels et aux contenus spécialisés avec un seul identifiant et mot de passe."
        },
        form: {
          loginTitle: "Se connecter",
          registerTitle: "Créer un compte",
          loginSubtitle: "Accédez à votre compte avec e-mail et mot de passe",
          registerSubtitle: "Entrez vos informations ci-dessous",
          fullNameLabel: "Nom complet",
          fullNamePlaceholder: "Votre nom",
          emailLabel: "E-mail",
          passwordLabel: "Mot de passe",
          confirmPasswordLabel: "Confirmer le mot de passe",
          forgotPassword: "Mot de passe oublié ?",
          loginButton: "Se connecter",
          registerButton: "S'inscrire"
        },
        errors: {
          shortPassword: "Le mot de passe doit contenir au moins 6 caractères.",
          passwordMismatch: "Les mots de passe ne correspondent pas."
        },
        switch: {
          hasAccount: "Vous avez déjà un compte ?",
          noAccount: "Vous n'avez pas encore de compte ?",
          loginBtn: "Se connecter",
          registerBtn: "S'inscrire"
        }
      }
    }
  },

  // 5. ITALIANO (IT)
  it: {
    translation: {
      header: {
        tagline: "Informazioni utili per guidare le tue decisioni",
        home: "Home",
        about: "Chi Siamo",
        subdomains: "Sottodomini",
        login: "Accedi",
        register: "Registrati"
      },
      hero: {
        title: "Portale Orientese",
        subtitle: "Un ecosistema di sottodomini specializzati per informare in modo utile e piacevole."
      },
      footer: {
        rights: "Tutti i diritti riservati.",
        credits: "Informazioni utili per guidare le tue decisioni"
      },
      subdomains: {
        accessButton: "Accedi al sito",
        comingSoon: "In preparazione",
        drones: {
          description: "Simulatore di preventivi, elenco di piloti, tecnici e servizi del settore."
        },
        mentora: {
          description: "Orientamento sulla responsabilità sociale e incentivi fiscali per le imprese."
        },
        standshowtour: {
          description: "Promozione aziendale e turistica con integrazione della realtà aumentata."
        },
        ofertas: {
          description: "Pubblicazione di offerte lecite e formazione commerciale per imprenditori."
        },
        empleos: {
          description: "Connessione diretta tra professionisti che offrono servizi e datori di lavoro."
        },
        ondesp: {
          description: "Guida utile e informativa su servizi, commercio e investimenti a San Paolo."
        }
      },
      common: {
        back: "Torna alla home",
        backHome: "← Torna alla home"
      },
      auth: {
        info: {
          subtitle: "Accedi a strumenti di calcolo, elenchi professionali e contenuti specializzati nei nostri sottodomini con un unico nome utente e password."
        },
        form: {
          loginTitle: "Accedi",
          registerTitle: "Crea Account",
          loginSubtitle: "Accedi al tuo account con e-mail e password",
          registerSubtitle: "Inserisci i tuoi dati qui sotto",
          fullNameLabel: "Nome completo",
          fullNamePlaceholder: "Il tuo nome",
          emailLabel: "E-mail",
          passwordLabel: "Password",
          confirmPasswordLabel: "Conferma password",
          forgotPassword: "Password dimenticata?",
          loginButton: "Accedi",
          registerButton: "Registrati"
        },
        errors: {
          shortPassword: "La password deve contenere almeno 6 caratteri.",
          passwordMismatch: "Le password non coincidono."
        },
        switch: {
          hasAccount: "Hai già un account?",
          noAccount: "Non hai ancora un account?",
          loginBtn: "Accedi",
          registerBtn: "Registrati"
        }
      }
    }
  }
};

// Aliases para soportar variaciones del selector
resources.pt = resources['pt-BR'];

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;