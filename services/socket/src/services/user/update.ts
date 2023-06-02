// update count of users 
const users = {
    count: 0
}

// check if room is full
const checkLimit = () => {
    if(users.count === 4) return 'Room Is Full'
}

// update local state count
export const update = async (req, res) => {
    if(res.name) {
        users.count++ 
        checkLimit()
    } 
}