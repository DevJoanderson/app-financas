import { useState, useEffect } from "react";
import * as C from "./styles";
import { formatCurrentMonth } from "../../helpers/dateFilter";
import { ResumeItem } from "../ResumeItem";
import { PieChartComponent } from "../../GraficoPizza/PieChartComponent";
import { BarChartComponent } from "../../GraficoPizza/BarChartComponent";
import { getGastosPorMes, getGastosPorCategoria } from '../../services/graficosService';
import type { GraficoData } from '../../services/graficosService';

type Props = {
  currentMonth: string;
  onMonthChange: (newMonth: string) => void;
  income: number;
  expense: number;
};

export const InfoArea = ({
  currentMonth,
  onMonthChange,
  income,
  expense,
}: Props) => {
  const [pizzaData, setPizzaData] = useState<GraficoData[]>([]);
  const [barData, setBarData] = useState<GraficoData[]>([]);

  const handlePrevMonth = () => {
    let [year, month] = currentMonth.split("-");
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() - 1);
    const formatted = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    onMonthChange(formatted);
  };

  const handleNextMonth = () => {
    let [year, month] = currentMonth.split("-");
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() + 1);
    const formatted = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    onMonthChange(formatted);
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onMonthChange(e.target.value); // valor vem no formato YYYY-MM
  };

  // 📊 Buscar dados do backend para os gráficos
  useEffect(() => {
    const fetchData = async () => {
      const [year, month] = currentMonth.split("-");
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const categoria = await getGastosPorCategoria(
          parseInt(month),
          parseInt(year),
          token
        );
        const mensal = await getGastosPorMes(parseInt(year), token);
        setPizzaData(categoria);
        setBarData(mensal);
      } catch (err) {
        console.error("Erro ao buscar dados dos gráficos:", err);
      }
    };

    fetchData();
  }, [currentMonth]);

  return (
    <C.Container>
      <C.MonthArea>
        <C.MonthArrow onClick={handlePrevMonth}>⬅️</C.MonthArrow>
        <C.MonthTitle>{formatCurrentMonth(currentMonth)}</C.MonthTitle>
        <C.MonthArrow onClick={handleNextMonth}>➡️</C.MonthArrow>
        <input
          type="month"
          value={currentMonth}
          onChange={handleDateInputChange}
        />
      </C.MonthArea>

      <C.ResumeArea>
        <ResumeItem title="Receitas" value={income} />
        <ResumeItem title="Despesas" value={expense} />
        <ResumeItem
          title="Balanço"
          value={income - expense}
          color={income - expense < 0 ? "red" : "green"}
        />
      </C.ResumeArea>

      {/* Gráficos dinâmicos conectados ao backend */}
      <C.ChartsArea>
        <div>
          <h3>Gastos por Categoria</h3>
          <PieChartComponent data={pizzaData} />
        </div>

        <div>
          <h3>Gastos por Mês</h3>
          <BarChartComponent data={barData} />
        </div>
      </C.ChartsArea>
    </C.Container>
  );
};
