import React from 'react';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { IItem } from '../apiData/api';

interface TableContentProps {
    items: IItem[];
}

const TableContent: React.FC<TableContentProps> = ({ items }) => {
    const formatDate = (dateString: string | null): string => {
        if (!dateString) return '';

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };

        return new Date(dateString).toLocaleString('ru-RU', options).replace(',', '');
    };

    const formatBoolean = (value: boolean | null): string => {
        return value === null ? '' : value ? 'Да' : 'Нет';
    };

    return (
        <TableBody>
            {items.map((item) => (
                <TableRow key={item.id}>
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">{item.title || ''}</TableCell>
                    <TableCell align="center">{item.description || ''}</TableCell>
                    <TableCell align="center">{formatDate(item.dttmCreated)}</TableCell>
                    <TableCell align="center">{item.reactLevel}</TableCell>
                    <TableCell align="center">{formatBoolean(item.enabled)}</TableCell>
                    <TableCell align="center">{item.tags.join(', ')}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default TableContent;
