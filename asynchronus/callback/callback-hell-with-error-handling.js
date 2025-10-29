function fetchUsers(cb) {
    console.log('fetching users');
    const Users = [
        {name: 'John', age: 25, _orderId : 1245},
        {name: 'Jane', age: 30, _orderId : 5623},
        {name: 'Bob', age: 35, _orderId : 5475},
        {name: 'Alice', age: 40, _orderId : 5685}
    ]
    cb(null, Users)
}
function getUser(name, Users, cb) {
    console.log('fetching user');
    const user = Users.find(user => user.name === name)
    if (!user) {
        cb(new Error('User not found'))
        return;
    }
    cb(null, user)
}

function getOrderStatus(orderId, cb) {
    const OrderStatuses = [
        { _orderId: 1245, status: 'pending'},
        { _orderId: 2533, status: 'delivered'},
        { _orderId: 5475, status: 'pending'},
    ]

    const order = OrderStatuses.find(order => order._orderId === orderId);
    if (!order) {
        cb(new Error('Order not found'))
        return;
    }
    console.log('fetching order status');
    const status = order.status;
    cb(null, status)
}

fetchUsers((err, users) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(users);
    getUser("Bob", users, (err, user) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(user);
        getOrderStatus(user._orderId, (err, status) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(status);
        })
    })

})
