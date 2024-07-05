import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import { StyledChartContainer } from './styles'; // Importe o StyledChartContainer do styles.js

export default function SimpleLineChart() {
  const [chartData, setChartData] = useState({ xAxis: [], series: [] });

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

        // Mapear os índices dos cabeçalhos para facilitar o acesso aos dados
        const headers = data[0]; // Cabeçalhos da tabela
        const headerMap = {};
        headers.forEach((header, index) => {
          headerMap[header.toLowerCase()] = index;
        });

        // Extrair IDs, Nomes e Salários
        // const idIndex = headerMap['id']; // Índice da coluna 'ID'
        const nomeIndex = headerMap['nome']; // Índice da coluna 'Nome'
        const salarioIndex = headerMap['salário']; // Índice da coluna 'Salário'

        // Agrupar dados por ID e Nome
        const xAxisData = rows.map(row => `${row[nomeIndex]}`); // Combinar ID e Nome
        const seriesData = rows.map(row => {
          const salary = parseFloat(row[salarioIndex]);
          return isNaN(salary) ? 0 : salary; // Substituir valores inválidos por 0
        });

        console.log('xAxisData:', xAxisData);
        console.log('seriesData:', seriesData);

        // Verificar se os dados são válidos antes de definir o estado
        if (xAxisData.length !== seriesData.length) {
          console.error('Os dados do eixo X e da série não correspondem em comprimento.');
          return;
        }

        // Define o estado com os dados formatados para o gráfico
        setChartData({ xAxis: xAxisData, series: [{ data: seriesData, label: 'Salário' }] });
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledChartContainer>
      {chartData.xAxis.length > 0 && chartData.series.length > 0 ? (
        <LineChart
          className="line-chart"
          width={800}
          height={300}
          series={chartData.series}
          xAxis={[{ scaleType: 'point', data: chartData.xAxis }]}
          grid={{ vertical: true, horizontal: true }}
        />
      ) : (
        <div>Carregando...</div>
      )}
    </StyledChartContainer>
  );
}
