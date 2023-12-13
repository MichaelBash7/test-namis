import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, IconButton, Checkbox, FormControlLabel } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {apiData, IItem} from '../apiData/api';
import {SelectChangeEvent} from "@mui/material/Select";

interface FiltersProps {
    onItemsFiltered: (items: IItem[]) => void;
}

const TableFilters: React.FC<FiltersProps> = ({ onItemsFiltered }) => {
    const [sortType, setSortType] = useState<string>('idAsc');
    const [filter, setFilter] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);

    useEffect(() => {
        const tags = new Set<string>();
        apiData.data.items.forEach((item: IItem) => {
            item.tags.forEach((tag) => tags.add(tag));
        });
        setAllTags(Array.from(tags));
    }, []);

    useEffect(() => {
        // Выполнение фильтрации и сортировки
        const filtered = filterItems();
        const sorted = applySorting(filtered, sortType);
        onItemsFiltered(sorted); // Обновление отфильтрованных данных в TableComponent
    }, [sortType, filter, selectedTags]);

    const handleTagChange = (tag: string) => {
        setSelectedTags((prev: string[]) => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag);
            } else {
                return [...prev, tag];
            }
        });
    };

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortType(event.target.value as string);
    };

        const applySorting = (items: IItem[], sortType: string): IItem[] => {
            return items.sort((a, b) => {
                let aValue: number | string, bValue: number | string;

                switch (sortType) {
                    case 'idAsc':
                    case 'idDesc':
                        aValue = a.id === null ? Infinity : a.id;
                        bValue = b.id === null ? Infinity : b.id;
                        break;
                    case 'titleAsc':
                    case 'titleDesc':
                        aValue = a.title === null ? '' : a.title;
                        bValue = b.title === null ? '' : b.title;
                        break;
                    case 'dateAsc':
                    case 'dateDesc':
                        aValue = a.dttmCreated === null ? Infinity : new Date(a.dttmCreated).getTime();
                        bValue = b.dttmCreated === null ? Infinity : new Date(b.dttmCreated).getTime();
                        break;
                    default:
                        return 0;
                }

                return sortType.endsWith('Asc') ? aValue > bValue ? 1 : -1 : aValue < bValue ? 1 : -1;
            });
        };


    const filterItems = (): IItem[] => {
        return apiData.data.items.filter((item: IItem) => {
            if (filter) {
                if (!item.description) return false;
                const description = item.description.replace(/\s+/g, ' ');
                if (!description.includes(filter)) return false;
            }

            if (selectedTags.length > 0) {
                if (!item.tags || item.tags.length === 0) return false;
                return item.tags.some(tag => selectedTags.includes(tag));
            }

            return true;
        });
    };

    return (
        <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
            <Grid item>
                <FormControl variant="outlined">
                    <InputLabel id="sort-label">Сортировка</InputLabel>
                    <Select
                        labelId="sort-label"
                        value={sortType}
                        onChange={handleSortChange}
                        label="Сортировка"
                    >
                        <MenuItem value="idAsc">ID Возрастание</MenuItem>
                        <MenuItem value="idDesc">ID Убывание</MenuItem>
                        <MenuItem value="titleAsc">Название А-Я</MenuItem>
                        <MenuItem value="titleDesc">Название Я-А</MenuItem>
                        <MenuItem value="dateAsc">Дата Возрастание</MenuItem>
                        <MenuItem value="dateDesc">Дата Убывание</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item alignContent="center">
                <TextField
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    label="Поиск по описанию"
                    variant="outlined"
                    margin="normal"
                />
            </Grid>

            <Grid item>
                <IconButton onClick={() => setFilter('')} aria-label="сбросить фильтр">
                    <CloseIcon />
                </IconButton>
            </Grid>

            {allTags.map(tag => (
                <Grid item key={tag}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleTagChange(tag)}
                            />
                        }
                        label={tag}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default TableFilters;
