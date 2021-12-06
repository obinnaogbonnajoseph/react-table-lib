export const padding = (size) => {
    return size === 'default' ? 'py-16 px-10' : 'py-6 px-10'
}

export const backgroundClass = (isSelected) => {
    return isSelected ? 'bg-green-50' : '';
}

export const borderBottomClass = (isLast) => {
    return isLast ? '' : 'border-t-0 border-l-0 border-r-0 border-b-1 border-neutral-400 border-solid'
}

export const hover = () => {
    return `hover:bg-neutral-800 hover:bg-opacity-5`
}

export const getRowClass = (isLast, isSelected, size = 'default') => {
    return `${padding(size)} ${backgroundClass(isSelected)} ${borderBottomClass(isLast)} ${hover()}`
}

export const titleCase = (val) => {
    return val.split(' ')
        .filter(out => out)
        .map(title => `${title.charAt(0).toUpperCase()}${title.substr(1).toLowerCase()}`).join(' ')
}