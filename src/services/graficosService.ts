import api from './api';

export type GraficoData = {
  name: string;
  value: number;
};

// Gráfico de Pizza - por categoria
export async function getGastosPorCategoria(
  mes: number,
  ano: number,
  token: string
): Promise<GraficoData[]> {
  const res = await api.get<GraficoData[]>(`/despesas/gastos-por-categoria?mes=${mes}&ano=${ano}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

// Gráfico de Barras - por mês
export async function getGastosPorMes(
  ano: number,
  token: string
): Promise<GraficoData[]> {
  const res = await api.get<GraficoData[]>(`/despesas/gastos-por-mes?ano=${ano}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
