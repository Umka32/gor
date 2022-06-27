// Обратный отсчет до конца дня
const countdown = () => {
  const currentDay = new Date()
  const modal = document.querySelector('.modal')
  const tomorrow = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + 1)
  let diff = tomorrow - currentDay
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);
  document.querySelector('.countdown__hours').innerHTML = hours < 10 ? '0' + hours : hours
  modal.querySelector('.countdown__hours').innerHTML = hours < 10 ? '0' + hours : hours
  document.querySelector('.countdown__hours-text').innerHTML = declensionOfWords(hours, ['Час', 'Часа', 'Часов'])
  modal.querySelector('.countdown__hours-text').innerHTML = declensionOfWords(hours, ['Час', 'Часа', 'Часов'])
  document.querySelector('.countdown__minutes').innerHTML = minutes < 10 ? '0' + minutes : minutes
  modal.querySelector('.countdown__minutes').innerHTML = minutes < 10 ? '0' + minutes : minutes
  document.querySelector('.countdown__minutes-text').innerHTML = declensionOfWords(minutes, ['Минута', 'Минуты', 'Минут'])
  modal.querySelector('.countdown__minutes-text').innerHTML = declensionOfWords(minutes, ['Минута', 'Минуты', 'Минут'])
  document.querySelector('.countdown__seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds
  modal.querySelector('.countdown__seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds
  document.querySelector('.countdown__seconds-text').innerHTML = declensionOfWords(seconds, ['Секунда', 'Секунды', 'Секунд'])
  modal.querySelector('.countdown__seconds-text').innerHTML = declensionOfWords(seconds, ['Секунда', 'Секунды', 'Секунд'])
}
// Склонятор слов относительно числа
const  declensionOfWords = (number, words) => {
  let cases = [2, 0, 1, 1, 1, 2];
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}
setInterval(countdown, 1000)

// Показываем/скрываем модальное окно
const showModal = () => {
  document.querySelector('.modal').classList.toggle('-invisible')
  document.querySelector('.overlay').classList.toggle('-invisible')
}

// Получаем рандомное число для нотификации
let currentRandom = 0;
const random = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min)
  if (rand === currentRandom) {
    rand = min + Math.random() * (max + 1 - min)
  }
  currentRandom = Math.floor(rand)
  return Math.floor(rand)
}
// Нотификация
let timerClose
const randomPopup = () => {
  let popUp = document.querySelector('.notifications__' + random(1, 3))
  popUp.classList.toggle('hide')
  timerClose = setTimeout(function () {
    popUp.classList.add('hide')
  }, 9000)
}

const closeNotification = (notification) => {
  notification.parentElement.classList.add('hide')
  clearTimeout('timerClose')
}

setInterval(randomPopup, 10000)

function sendForm() {
  Array.from(this.elements)
  let dataForm = {}
  dataForm.name = Array.from(this.elements)[0].value
  dataForm.phone = Array.from(this.elements)[1].value
  dataForm.country = Array.from(this.elements)[2].value
  console.log(dataForm)
  alert('Спасибо за заказ!')
}

const form = document.querySelector('.promo__form')
const modalForm = document.querySelector('.modal__form')
form.addEventListener('submit', sendForm)
modalForm.addEventListener('submit', sendForm)

