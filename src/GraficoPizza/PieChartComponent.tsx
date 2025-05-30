import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

type DataType = {
  name: string;
  value: number;
};

interface Props {
  data: DataType[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

// Função para exibir o percentual no gráfico
const renderCustomLabel = ({
  percent,
  x,
  y,
  index,
}: {
  percent: number;
  x: number;
  y: number;
  index: number;
}) => {
  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export function PieChartComponent({ data }: Props) {
  return (
    <PieChart width={250} height={250}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={60}
        label={renderCustomLabel}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="bottom" iconSize={10} />
    </PieChart>
  );
}
