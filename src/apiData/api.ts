export interface IItem {
    id: number | null;
    title: string | null;
    description: string | null;
    reactLevel: string;
    enabled: boolean | null;
    dttmCreated: string | null;
    tags: string[];
}

export interface IApiData {
    data: {
        items: IItem[];
    };
}

export const apiData: IApiData =
    {
        "data": {
            "items": [
                {
                    "id": 1,
                    "title": null,
                    "description": "описание а Б  в  г д ",
                    "reactLevel": "warning",
                    "enabled": true,
                    "dttmCreated": "2023-10-22T11:17:22",
                    "tags": ["альфа", "бета", "гамма"]
                },
                {
                    "id": 2,
                    "title": " Заголовок ББББББ ",
                    "description": "описание г  д Е ж  з ",
                    "reactLevel": "critical",
                    "enabled": null,
                    "dttmCreated": "2023-10-24T18:22:05",
                    "tags": ["сигма", "бета", "гамма"]
                },
                {
                    "id": 3,
                    "title": " Заголовок ВВВБББ ",
                    "description": null,
                    "reactLevel": "warning",
                    "enabled": false,
                    "dttmCreated": "2023-10-31T12:27:33",
                    "tags": ["омега", "сигма", "гамма"]
                },
                {
                    "id": 4,
                    "title": " Заголовок БББВВВ ",
                    "description": "описание г Д е ",
                    "reactLevel": "critical",
                    "enabled": true,
                    "dttmCreated": null,
                    "tags": ["альфа", "омега", "гамма"]
                }
            ]
        }
    }


