export function daysToString(days) {
    if (days == 7) {
        return "weekly";
    }
    else if (days == 14) {
        return "biweekly";
    }
    else if (days == 28) {
        return "monthly";
    }
    else if (days == 365) {
        return "annually";
    }
    return "every " + days + " days";
};

export function stringToDays(unit) {    //currently not used due to refactoring, leaving in case of later use
    if (unit == "day(s)") {
        return parseInt(1);
    }
    else if (unit == "week(s)") {
        return parseInt(7);
    }
    else if (unit == "month(s)") {
        return parseInt(28);
    }
    else if (unit == "year(s)") {
        return parseInt(365);
    }
    return null;
}

export const periodInDaysMap = { //map for displaying income over different periods
    daily: 1,
    weekly: 7,
    monthly: 28,
    yearly: 365
};
