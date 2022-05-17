import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './Coin.css';

const Coin = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Монета</TableCell>
            <TableCell align="center">Название</TableCell>
            <TableCell align="right">Цена</TableCell>
            <TableCell align="right">Объем торгов за 24 часа</TableCell>
            <TableCell align="right">Рыночная кап-ция</TableCell>
            <TableCell align="right">24ч</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <tbody class='coin'>
              <TableCell component="th" scope="row">
              {row.market_cap_rank}<img src={row.image} />{row.name}
              </TableCell>
              </tbody>
              <TableCell align="right">{row.symbol}</TableCell>
              <TableCell align="right">${row.current_price}</TableCell>
              <TableCell align="right">${row.total_volume}</TableCell>
              <TableCell align="right">${row.market_cap}</TableCell>
              <TableCell align="right">
                {row.price_change_percentage_24h < 0 ? (
                 <p className='coin-percent red'>{row.price_change_percentage_24h}%</p>
                ) : (
                  <p className='coin-percent green'>{row.price_change_percentage_24h}%</p>
                )}
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Coin;;
