import moment from "moment";

// using moment.js to format date
export const formatDate = (date: string, showTime?: boolean) => {
    return showTime ? moment(date).format('YYYY/MM/DD HH:mm') : moment(date).format('YYYY.MM.DD');
}

export const formatNumber = (number: number) => {
    return new Intl.NumberFormat('en-US').format(number);
}