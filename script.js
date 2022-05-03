const usersContainer = document.querySelector('.users')
const searchEl = document.getElementById('search')

let amount = 30
let fetchedUsers = []

searchEl.oninput = function (e) {
  const usersArray = document.querySelectorAll('.users .userInfo')

  for (let i = 0; i < amount; i++) {
    const userNameText =
      usersArray[i].querySelector('h6').innerText +
      ' ' +
      usersArray[i].querySelector('p').innerText

    if (userNameText.toLowerCase().includes(e.target.value.toLowerCase())) {
      usersArray[i].parentElement.style.display = 'flex'
    } else {
      usersArray[i].parentElement.style.display = 'none'
    }
  }
}

getUsers()

async function getUsers() {
  const res = await fetch(`https://randomuser.me/api/?results=${amount}`)
  const data = await res.json()

  //закинем в глобальную переменную массив с данными пользователей
  fetchedUsers = data.results

  //сформируем карточки пользователей и добавим их в DOM
  createUserProfiles(fetchedUsers)
}

function createUserProfiles(users) {
  users.forEach(({ picture, name, location }) => {
    const userEl = `<div class="userContainer">
          <img
            src="${picture?.large}"
            alt="user_avatar"
            class="userAvatar"
          />
          <div class="userInfo">
            <h6 class="userName">${name?.first} ${name?.last}</h6>
            <p class="userLocation">${location?.city}, ${location?.country}</p>
          </div>
    </div>`

    usersContainer.innerHTML += userEl
  })
}
