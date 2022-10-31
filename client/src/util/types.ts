export type Student = {
    student_id: number
    student_name: string
    id: string
    date_of_birth: string
    age: string
    weight: string
    height: string
    hmo: number | string
    address: string
    framework: string
    working_on: string
    instructor_id: number
    instructor_name: string
}

export type Instructor = {
    instructor_id: string
    instructor_name: string
    address: string
    email: string
    phone_number: string
}

export type Horse = {
    horse_id: number
    horse_name: string
    age: number | string
    breed: string
    assignable: string
}

export type Lesson = {
    lesson_id: number
    horse_name: string
    date: string
    lesson_time: string
    student_name: string
    hmo: number | string
    arrived: string
}

export type LessonsData = {
    count: number
    substring: string
    instructor_name: string
}

export type ChartData = {
    labels: string[]
    count: number[]
}

export type Month = {
    substring: string
}

export type Salary = {
    count: number
    substring: string
}

export type HorseData = {
    count: number
    horse_name: string
}

export type UserDashboardData = {
    salaryData: Salary[]
    horsesData: HorseData[]
    personalData: Instructor
}

export type DashboardData = {
    dashboardData: LessonsData[] | UserDashboardData
}