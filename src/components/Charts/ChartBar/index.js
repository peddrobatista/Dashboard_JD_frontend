import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { StyledChartContainer } from './styles';

export default function SimpleBarChart() {
  const [chartData, setChartData] = useState({ xAxis: [], series: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/rows');
        const data = response.data.values;

        console.log('Dados recebidos da API:', data);

        if (data.length < 2) {
          console.error('Dados insuficientes para exibir o gráfico.');
          return;
        }

        const rows = data.slice(1); // Linhas da tabela

        // Mapear os índices dos cabeçalhos para facilitar o acesso aos dados
        const headers = data[0]; // Cabeçalhos da tabela
        const headerMap = {};
        headers.forEach((header, index) => {
          headerMap[header.toLowerCase()] = index;
        });

        // Índice da coluna 'Status'
        const statusIndex = headerMap['status'];

        // Agrupar dados por Status
        const statusCount = rows.reduce((acc, row) => {
          const status = row[statusIndex];
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        // Preparar dados para o gráfico
        const xAxisData = Object.keys(statusCount);
        const seriesData = Object.values(statusCount);

        console.log('xAxisData:', xAxisData);
        console.log('seriesData:', seriesData);

        // Verificar se os dados são válidos antes de definir o estado
        if (xAxisData.length !== seriesData.length) {
          console.error('Os dados do eixo X e da série não correspondem em comprimento.');
          return;
        }

        // Define o estado com os dados formatados para o gráfico
        setChartData({ xAxis: xAxisData, series: [{ data: seriesData, label: 'Cadastrados', color: '#1e90ff' }] });
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledChartContainer>
      {chartData.xAxis.length > 0 && chartData.series.length > 0 ? (
        <BarChart
          className="bar-chart"
          borderRadius={6}
          width={800}
          height={350}
          xAxis={[{ scaleType: 'band', data: chartData.xAxis }]}
          series={chartData.series}
          grid={{ vertical: true, horizontal: true }}
        />
      ) : (
        <div>Carregando...</div>
      )}
    </StyledChartContainer>
  );
}
