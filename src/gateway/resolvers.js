import R from 'ramda';

const users = [
    { id: 0, email: 'toby@dundermifflin.com' },
    { id: 1, email: 'jim@dundermifflin.com' },
    { id: 2, email: 'pam@dundermifflin.com' },
    { id: 3, email: 'dwight@dundermifflin.com' },
    { id: 4, email: 'michael@dundermifflin.com' },
    { id: 5, email: 'andy@dundermifflin.com' },
]

export function fetchUser({id},context){
    return users[id]
}

export function createUser({ input }, context) {
    users.push({ id: users.length, email: input.email, firstName: input.firstName, lastName: input.lastName })
    return R.last(users)
  }