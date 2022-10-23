export const workHours = [
    "08:00-08:45",
    "08:45-09:30",
    "09:30-10:15",
    "10:15-11:00",
    "11:00-11:45",
    "11:45-12:30",
    "12:30-13:15",
    "13:15-14:00",
    "14:00-14:45",
    "14:45-15:30",
    "15:30-16:15",
    "16:15-17:00",
    "17:00-17:45",
    "17:45-18:30"
];

export const filterHours = (result: string[]) => {
    return workHours.filter((hour: string) => !result.includes(hour))
}
