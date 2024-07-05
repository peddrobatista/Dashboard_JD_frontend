import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';

export default function HorizontalBars() {
  const [chartData, setChartData] = useState({ yAxis: [], series: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/rows');
        const data = response.data.values;

        console.log('Dados recebidos da API:', data);

        if (data.length < 2) {
          console.error('Dados insuficientes para exibir o gráfico.');
          return;
        }

        const rows = data.slice(1); // Linhas da tabela

        const yAxisData = rows.map(row => row[1]); // 'Nome' está na coluna 'B'
        const seriesData = rows.map(row => parseFloat(row[3])).filter(value => !isNaN(value)); // 'Salário' está na coluna 'D'

        console.log('yAxisData:', yAxisData);
        console.log('seriesData:', seriesData);

        // Verificar se os dados são válidos antes de definir o estado
        if (yAxisData.length !== seriesData.length) {
          console.error('Os dados do eixo Y e da série não correspondem em comprimento.');
          return;
        }

        // Define o estado com os dados formatados para o gráfico
        setChartData({ yAxis: yAxisData, series: [{ data: seriesData, label: 'Salário', color: '#2ed573' }] });
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {chartData.yAxis.length > 0 && chartData.series.length > 0 ? (
        <BarChart
          yAxis={[{ scaleType: 'band', data: chartData.yAxis }]}
          xAxis={[{ label: 'Salário (R$)' }]}
          series={chartData.series}
          layout="horizontal"
          width={800}
          height={400}
          grid={{ vertical: true }}
        />
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
}
