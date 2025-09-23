import styled from '@emotion/styled';
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Typhography from '../common/Typography';

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

interface ChartData {
  day: number;
  weight: number;
  standardWeight: number;
}

interface ChartProps {
  data: ChartData[] | undefined;
}

const WeightChart = ({ data }: ChartProps) => {
  return (
    <>
      {data?.length !== 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={350}
            height={280}
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 12 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <YAxis dataKey="weight" type="number" tickFormatter={(weight) => (weight === 0 ? '' : `${weight}kg`)}/>
            <XAxis
              dataKey="day"
              type="number"
              domain={[0, 'maxData']}
              tickFormatter={(day) => (day === 0 ? '0' : `${day}일`)}
            ></XAxis>
            <Tooltip
              formatter={(value, name) => [
                `${value} kg`,
                name === 'weight' ? '우리 아이 몸무게' : '또래 아이 몸무게',
              ]}
              labelFormatter={(label) => `${label}일`}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ marginTop: -15 }}
            />
            <Line
              type="linear"
              dataKey="weight"
              stroke="#ff6f00"
              name="우리 아이 몸무게"
            />
            <Line
              type="linear"
              dataKey="standardWeight"
              stroke="#c0ca33"
              name="또래 아이 몸무게"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <ChartWrapper>
          <Typhography color="greyScale" shade="800">
            출생 후 등록한 몸무게 데이터가 없습니다.
          </Typhography>
        </ChartWrapper>
      )}
    </>
  );
};

export default WeightChart;
