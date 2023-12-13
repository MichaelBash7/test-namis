import React, {useState} from 'react';
import {apiData, IItem} from '../apiData/api';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TableFilters from "./TableFilters";
import TableContent from "./TableContent";

const TableComponent: React.FC = () => {

    const [filteredItems, setFilteredItems] = useState<IItem[]>(apiData.data.items);

    const handleItemsFiltered = (items: IItem[]) => {
        setFilteredItems(items);
    };

    return (
        <>
            <TableFilters onItemsFiltered={handleItemsFiltered}/>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Фильтр</TableCell>
                        <TableCell align="center">Описание</TableCell>
                        <TableCell align="center">Создан</TableCell>
                        <TableCell align="center">Уровень</TableCell>
                        <TableCell align="center">Действует</TableCell>
                        <TableCell align="center">Флаги</TableCell>
                    </TableRow>
                </TableHead>
                <TableContent items={filteredItems}/>
            </Table>
        </>
    );
};
export default TableComponent;
