// plugins/tools.js

const toolsMixin = {
    methods: {
        dateToDB(date) {
            const [day, month, year] = date.split('/');
            return `${year}-${month}-${day}`;
        },

        dbDateToFr(date) {
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },

        dbDateHourToFr(dbDateTime) {
            const [date, time] = dbDateTime.split(' ');
            const formattedDate = this.dbDateToFr(date);
            return `${formattedDate} à ${time}`;
        },

        formatAmount(amount) {
            return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
        },

        cutText(text, maxLength) {
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        }
    },
    directives: {
        focus: {
            // Cette méthode est appelée lorsque l'élément est inséré dans le DOM
            inserted(el) {
                // Donne le focus à l'élément
                el.focus();
            }
        }
    }
};

export default toolsMixin;