import React from 'react';
import Box from '@mui/material/Box';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const TaxaCadCriados = ({ taxaData }) => {
  const { taxa, isPositive } = taxaData;

  return (
    <Box>
      <Paper elevation={2} sx={{ borderRadius: "8px", padding: '10px' }}>
        <Box flexGrow={1}>
          <Typography sx={{ fontWeight: 700, color: '#636e72' }} gutterBottom>Insights</Typography>
          <Typography variant='h6' sx={{ fontWeight: '800', color: '#636e72' }}>Cadastros Criados</Typography>
          <Divider />
          <Stack direction='row' alignItems={'center'} justifyContent={'start'}>
            <Typography sx={{ fontSize: '40px', fontWeight: '800', color: isPositive ? '#2ed573' : '#ff4757' }}>
              {isPositive ? `+ ${taxa.toFixed(1)}%` : `- ${taxa.toFixed(1)}%`}
            </Typography>
            {isPositive ? (
              <ArrowDropUpIcon sx={{ fontSize: 80, color: '#2ed573' }} />
            ) : (
              <ArrowDropDownIcon sx={{ fontSize: 60, color: '#ff4757' }} />
            )}
            <Typography sx={{ fontWeight: '600', color: '#636e72' }}>/12 meses</Typography>
          </Stack>
          <Typography sx={{ fontWeight: '600', color: '#636e72' }}>
            Taxa de crescimento entre o 3º bimestre de 2023 e o 3º bimestre de 2024
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default TaxaCadCriados;
