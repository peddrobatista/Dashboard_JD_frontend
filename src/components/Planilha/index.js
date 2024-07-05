import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled, alpha } from '@mui/material/styles';

const EVEN_OPACITY = 0.3;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .MuiDataGrid-row:nth-of-type(even)`]: { // cor das linhas pares
    backgroundColor: alpha('#595959', EVEN_OPACITY),
    '&:hover': {
      backgroundColor: alpha('#757575', EVEN_OPACITY + theme.palette.action.hoverOpacity),
    },
    '&.Mui-selected': {
      backgroundColor: alpha('#424242', EVEN_OPACITY + theme.palette.action.selectedOpacity),
      '&:hover': {
        backgroundColor: alpha('#616161', EVEN_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      },
    },
  },
  [`& .MuiDataGrid-row:nth-of-type(odd)`]: { // cor das linhas ímpares
    backgroundColor: '#f5f6fa',
    '&:hover': {
      backgroundColor: '#e5e6ea',
    },
    '&.Mui-selected': {
      backgroundColor: '#d5d6da',
      '&:hover': {
        backgroundColor: '#c5c6ca',
      },
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#595959',
    color: '#fff',
    fontWeight: 'bold',
  },
}));

const Planilha = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/rows');
        const data = response.data.values; // Ajuste conforme necessário para acessar os dados corretos
        setRows(data.slice(1).map((row, index) => ({ id: index, ...row })));
        setColumns(data[0].map((header, index) => ({
          field: index.toString(),
          headerName: header,
          width: 150,
          headerAlign: 'center', // centraliza os itens do cabeçalho da tabela
          align: 'center', // centraliza os itens do corpo da tabela
          headerClassName: 'theme-header'
        })));
      } catch (error) {
        console.error('Erro ao buscar dados da planilha:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={{
      width: '96%',
      margin: '20px auto',
      borderRadius: '10px',
      height: 700,
      '& .theme-header': {
        backgroundColor: '#595959',
        color: '#fff',
        fontWeight: "bold"
      },
    }}>
      <StripedDataGrid
        slots={{ toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[20, 30]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
    </Paper>
  );
};

export default Planilha;
