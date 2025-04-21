import { Category } from "../types/Category";

export const categories: Category = {
    food:         { title: 'Alimentação', color: '#FFA500', expense: true },
    rent:         { title: 'Aluguel', color: '#FF0000', expense: true },
    investment:   { title: 'Saúde', color: '#5DADE2', expense: true },
    salary:       { title: 'Salário', color: '#4CAF50', expense: false },
    transport:    { title: 'Transporte', color: '#A569BD', expense: true },
    education:    { title: 'Educação', color: '#3498DB', expense: true },
    leisure:      { title: 'Lazer', color: '#E67E22', expense: true },
    market:       { title: 'Supermercado', color: '#2ECC71', expense: true },
    phone:        { title: 'Telefone/Internet', color: '#16A085', expense: true },
    water:        { title: 'Água', color: '#3498DB', expense: true },
    energy:       { title: 'Energia', color: '#F1C40F', expense: true },
    freelance:    { title: 'Freelance', color: '#1ABC9C', expense: false },
    bonus:        { title: 'Bônus', color: '#8E44AD', expense: false },
    gift:         { title: 'Presente', color: '#E74C3C', expense: true },
    pets:         { title: 'Pets', color: '#C0392B', expense: true },
  };