exports.users = [
  {
    id: 'superadmin@pasahero.com',
    password: '123',
    lastName: 'Gubac',
    firstName: 'Mark Lester',
    role: 'superadmin',
    phone: '12345',
  },
  {
    id: 'admin1@pasahero.com',
    password: '123',
    lastName: 'Rivera',
    firstName: 'Christopher Josh',
    role: 'superadmin',
    phone: '6789',
  },
  {
    id: 'dylan@gmail.com',
    password: '123',
    lastName: 'Bartolome',
    firstName: 'Dylan',
    role: 'commuter',
    phone: '3255',
  }
]

exports.loopBuses = [
 {
  name: 'Loop Bus 1',
  imageUrl: 'https://www.phbus.com/wp-content/uploads/2022/02/Clark-Metro-Loop-Bus-Service.jpg',
 },
 {
   name: 'Loop Bus 2',
   imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCOiFkoGqE1GlzyZTIZbL0FOu4cnWPrdnCCHy_ZNDO53BMuqtudAWNbJNCRSwQN7BkyvE&usqp=CAU',
 }
]

exports.loopBusLocations = [
  {
    location: '',
    stopNumber: 0,
  }
]

exports.loopBusFares = [
  {
    fareType: 'Regular',
    fee: 10,
    loopBusId: 1,
  },
  {
    fareType: 'Senior Citizen',
    fee: 20,
    loopBusId: 1,
  },
  {
    fareType: 'Regular',
    fee: 10,
    loopBusId: 2,
  },
  {
    fareType: 'Senior Citizen',
    fee: 20,
    loopBusId: 2,
  }
]





// const driverUser = {
//   id: '',
//   password: '',
//   lastName: '',
//   firstName: '',
//   role: 'commuter',
//   phone: '',
// }