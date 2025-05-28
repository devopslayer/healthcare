import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

const BarChartStackedBySign = ({ data, keys, colors }) => {
  return (
    <div style={{ width: "100%", height: 300, marginBottom: 20 }}>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data}
          stackOffset="sign"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barCategoryGap="25%"
          barSize={10}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="stack"
              fill={colors[index] || "#ccc"}
              radius={12}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartStackedBySign;
