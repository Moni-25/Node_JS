const { writeFile} = require ("node:fs/promises");

try{
    var current_date = new Date();
    var data = {
        date: current_date.getDate(),
        hour: current_date.getHours(),
        min: current_date.getMinutes()
    }
    writeFile(
        `${data.date}-${data.hour}-${data.min}.txt`, current_date.toString()
    )
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
}
catch(error)
{
    console.log(error)
}