function getRandomNumber(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function table() {
    return (
        {
            "columns": [
                { "title": "A", "dataIndex": "a" },
                { "title": "B", "dataIndex": "b" },
                { "title": "C", "dataIndex": "c" }
            ],
            "data": [
                { "a": getRandomNumber(), "b": getRandomNumber(), "c": getRandomNumber() },
                { "a": getRandomNumber(), "b": getRandomNumber(), "c": getRandomNumber() },
                { "a": getRandomNumber(), "b": getRandomNumber(), "c": getRandomNumber() }
            ]
        }
    )

}

export default table;
