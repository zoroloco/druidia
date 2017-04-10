mongo.exe

use drudiia

db.createCollection("users")

db.users.insert({
  username: 'kcenturion',
  password: 'kcenturion',
  role: 'admin',
  description: 'root'
  })
