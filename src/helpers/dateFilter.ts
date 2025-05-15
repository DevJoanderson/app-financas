import { Item } from '../types/Item';
export const getCurrentMonth = () => {
    let now = new Date();
    let month = now.getMonth() + 1;
    let formattedMonth = month < 10 ? `0${month}` : `${month}`;
    return `${now.getFullYear()}-${formattedMonth}`;
};


export const filterListByMonth = (list: Item[], date: string): Item[] => {
    let newList: Item[] = [];
    let [year, month] = date.split('-');

    for (let i in list) {
        const itemDate = list[i].date;
        const itemYear = itemDate.getFullYear();
        const itemMonth = (itemDate.getMonth() + 1).toString().padStart(2, '0');

        if (itemYear === parseInt(year) && itemMonth === month) {
            newList.push(list[i]);
        }
    }

    return newList;
};


export const formatDate = (date: Date): string => {
    let year = date.getFullYear();
    let month = date.getMonth() +1;
    let day = date.getDate();

    return `${addZeroToDate(day)}/${addZeroToDate(month)}/${year}`;
}

const addZeroToDate = (n: number): string => n <10 ? `0${n}` : `${n}`;

export const formatCurrentMonth = (currentMonth: string): string => {
    let [year, month] = currentMonth.split('-');
    let months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${months[parseInt(month) - 1]} de ${year}`;
};
    

    