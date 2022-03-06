export type ApiData = {
    name: string;
    email: string;
    joined: string;
}

export type SortHeadersType = {
    value: keyof ApiData,
    sort: 'asc' | 'desc'
}

export type DerivedDataSubType = {
    type: 'text' | 'template';
    text?: ApiData[keyof ApiData];
    template?: JSX.Element;
}

export type DerivedDataType = Record<keyof ApiData, DerivedDataSubType>

export type MoreOptionsDataType = {
    text: string;
    icon: string;
    action: (val: any) => void
}

export type RowType = {
    id: number;
    value: DerivedDataSubType[]
}

export type SizeType = 'default' | 'dense';

export type HeaderType = keyof DerivedDataType;

