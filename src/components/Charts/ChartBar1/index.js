import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';
import { StyledChartContainer } from '../ChartBar1/styles';

const CustomBarChartByIncome = () => {
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

        // Índice da coluna 'Renda Familiar' - Ajuste conforme necessário
        const rendaFamiliarIndex = headerMap['renda familiar'];

        // Agrupar dados por Renda Familiar
        const incomeCounts = {};
        rows.forEach(row => {
          const rendaFamiliar = row[rendaFamiliarIndex];
          if (rendaFamiliar) {
            if (!incomeCounts[rendaFamiliar]) {
              incomeCounts[rendaFamiliar] = 0;
            }
            incomeCounts[rendaFamiliar]++;
          }
        });

        // Preparar dados para o gráfico
        const xAxisData = Object.keys(incomeCounts);
        const seriesData = Object.values(incomeCounts);

        // Define o estado com os dados formatados para o gráfico
        setChartData({
          xAxis: xAxisData.map((item, index) => ({ id: index, value: item })),
          series: [{ data: seriesData, label: 'Renda Familiar', color: '#1e90ff' }]
        });
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Typography className='title' variant='h6' sx={{ fontWeight: 700, color: '#636e72', marginTop: '10px', textAlign: 'center' }}>Distribuição por Renda Familiar</Typography>
    <StyledChartContainer>
      {chartData.xAxis.length > 0 && chartData.series.length > 0 ? (
        <BarChart
          className="bar-chart"
          borderRadius={6}
          width={800}
          height={300}
          xAxis={[{ scaleType: 'band', data: chartData.xAxis.map(item => item.value) }]}
          series={chartData.series}
          grid={{ vertical: true, horizontal: true }}
          sx={{marginBottom: '20px'}}
        />
      ) : (
        <div>Carregando...</div>
      )}
    </StyledChartContainer>
    </>
  );
};

export default CustomBarChartByIncome;
