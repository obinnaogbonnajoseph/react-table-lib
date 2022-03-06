import { DerivedDataSubType, DerivedDataType, SizeType } from "@models/models";

export const padding = (size: SizeType) => {
    return size === 'default' ? 'py-16 px-10' : 'py-6 px-10'
}

export const backgroundClass = (isSelected: boolean) => {
    return isSelected ? 'bg-green-50' : '';
}

export const borderBottomClass = (isLast: boolean) => {
    return isLast ? '' : 'border-t-0 border-l-0 border-r-0 border-b-1 border-neutral-400 border-solid'
}

export const hover = () => {
    return `hover:bg-neutral-800 hover:bg-opacity-5`
}

export const getRowClass = (isLast: boolean, isSelected: boolean, size: SizeType = 'default') => {
    return `${padding(size)} ${backgroundClass(isSelected)} ${borderBottomClass(isLast)} ${hover()}`
}

export const titleCase = (val: string) => {
    return val.split(' ')
        .filter(out => out)
        .map(title => `${title.charAt(0).toUpperCase()}${title.substr(1).toLowerCase()}`).join(' ')
}

export const removeRow = (row: DerivedDataType, rows: DerivedDataType[]) => {
    return rows.filter(currentRow => {
        const sameKeys = Object.keys(currentRow).length === Object.keys(row).length;
        if (sameKeys) {
            const keys = Object.keys(currentRow) as (keyof DerivedDataType)[];
            for (let key of keys) {
                const val = row[key];
                const subkeys = Object.keys(val) as (keyof DerivedDataSubType)[];
                for (let subkey of subkeys) {
                    if (subkey !== 'template' && val[subkey] !== currentRow[key][subkey]) return true;
                }
            }
        } else return true
        return false
    })
}