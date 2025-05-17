// components/PieChart.tsx

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PieChartComponent = ({ taskData }) => {
  // Define the chart data
  const data = [
    { name: 'Pending', value: taskData.pending },
    { name: 'In Progress', value: taskData.inProgress },
    { name: 'Completed', value: taskData.completed },
  ];

  const COLORS = ['#FF9999', '#66B3FF', '#99FF99'];

  return (
    <div className="chart-container">
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"  // Center the pie chart
            cy="50%"
            outerRadius={100} // Size of the outer radius
            innerRadius={0} // Size of the hole in the middle
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} tasks`} labelFormatter={(label) => `${label} Status`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
