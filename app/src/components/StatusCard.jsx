
import { LineChart, Line, ResponsiveContainer } from "recharts";

const StatusCard = ({ title, data, percentage }) => {
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    width: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
  };

  const percentageStyle = {
    color: percentage >= 0 ? "green" : "red",
    fontWeight: "bold",
  };

  return (
    <div style={cardStyle}>
      <h4>{title}</h4>
      <ResponsiveContainer width="100%" height={50}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <p style={percentageStyle}>
        {percentage >= 0 ? `↑` : `↓`} {Math.abs(percentage)}%
      </p>
    </div>
  );
};

export default StatusCard;
