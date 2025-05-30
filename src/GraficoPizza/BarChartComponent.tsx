import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

type DataType = {
  name: string;
  value: number;
};

interface Props {
  data: DataType[];
}

export function BarChartComponent({ data }: Props) {
  return (
    <BarChart
      width={350}
      height={300}
      data={data}
      margin={{ top: 10, right: 25, left: 0, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" fontSize={12} />
      <YAxis fontSize={12} />
      <Tooltip />
      <Legend
        verticalAlign="bottom"
        iconSize={10}
        wrapperStyle={{ fontSize: 12, paddingTop: 4 }}
      />
      <Bar dataKey="value" fill="#8884d8" barSize={24} />
    </BarChart>
  );
}
