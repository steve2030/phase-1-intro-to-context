// Your code here
const createEmployeeRecord = (employeeInfo) => {
    const employeeRecord = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord


},
createEmployeeRecords = (employees) => {
    return employees.map(employee => createEmployeeRecord(employee))
},

createTimeInEvent = (bpRecord, dateStamp) => {
    let [date, hour] = dateStamp.split(' ');
    bpRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return bpRecord;
},
createTimeOutEvent = (bpRecord, dateStamp) => {
    let [date, hour] = dateStamp.split(' ');
    bpRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return bpRecord;
},
hoursWorkedOnDate = (cRecord, dateStamp) => {

    const timeIns = cRecord.timeInEvents.find(timeRecords =>
        timeRecords.date === dateStamp);
    const timeOuts = cRecord.timeOutEvents.find(timeRecords =>
        timeRecords.date === dateStamp
    );
    const hoursWorked = (timeOuts.hour - timeIns.hour) / 100;
    return hoursWorked;
},
wagesEarnedOnDate = (bpRecord, dateStamp) => {
    const elapsedTime = hoursWorkedOnDate(bpRecord, dateStamp)
    const amountOwed = elapsedTime * bpRecord.payPerHour;
    return amountOwed;
},
allWagesFor = (bpRecord) => {

    const allWages = bpRecord.timeOutEvents.reduce((accumulate, timeRecords) =>
        wagesEarnedOnDate(bpRecord, timeRecords.date) + accumulate, 0)
    return allWages;


},
calculatePayroll = (employeesRecords) => {
    return employeesRecords.reduce((totalAmount, employee) =>
        totalAmount = totalAmount + allWagesFor(employee), 0)

}

cRecord = createEmployeeRecord(["stephen", "abigael", "joywin", 27])
// Earns 324
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
// Earns 54
updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")

// console.log(allWagesFor(cRecord))

console.log(allWagesFor(cRecord))
