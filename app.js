// Endpoint - http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/contacts

// Итак, делаем все то же, что и в прошлой домашке, только для контактов.

// Для создания контакта у нас три инпута - имя, фамилия, телефон
// При нажатии на кнопку создать контакт отправляем POST на наш эндпоинт
// при загрузке нашего приложения сразу отправляем GET запрос на наш эндпоинт и получаем все контакты, их и выводим в списке контактов
// в списке контактов каждый контакт имеет имя, фамилию, телефон и две кнопки - редактировать и удалить
// При нажатии на удалить отправляем DELETE запрос на эндпоинт
// При редактировании показываем блок редактирования с тремя полями, При сохранении контакта, отправляем PUT запрос на наш эндпоинт


const contact = new Contacts();

const inpContactNameE = document.querySelector('.inp-name');
const inpContactLastE = document.querySelector('.inp-last');
const inpContactPhoneE = document.querySelector('.inp-phone');
const btnAddContactE = document.querySelector('.btn-add-contact');

const inpChangeContactNameE = document.querySelector('.inp-change-contact-name');
const inpChangeContactLastE = document.querySelector('.inp-change-contact-last');
const inpChangeContactPhoneE = document.querySelector('.inp-change-contact-phone');
const btnSaveChangesE = document.querySelector('.btn-save-changes');

const contactContE = document.querySelector('.contacts-cont');
const changeContactContE = document.querySelector('.edit-contact');

btnAddContactE.addEventListener('click', onAddContact);
btnSaveChangesE.addEventListener('click', onSaveChanges);
contactContE.addEventListener('click', onContactClick);

let contacts = [];
let currentId = '';
let currentData = getCurrentDate(); 

let newContact = {
    name: '',
    lastName: '',
    phone: '',
}

function getCurrentDate() {
    let current = new Date();
    let year = current.getFullYear();
    let month = current.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let date = current.getDate();
    if (date < 10) date = '0' + date;
    return date +'.'+ month +'.'+ year;
}

readContacts();

function readContacts(){
    contact.getContacts().then(r => {
        contacts = r.splice(0, 40);
        renderContacts(contacts);
    });
}

function onAddContact(newContact) {
    newContact = {
        name: inpContactNameE.value,
        lastName: inpContactLastE.value,
        phone: inpContactPhoneE.value,
    }
   
    contact.createContact(newContact)
        .then(result => result.json())
        .then(data => {
            contacts.push(data);
            renderContacts(contacts);
        })
    
    clearValue (inpContactNameE);
    clearValue (inpContactLastE);
    clearValue (inpContactPhoneE);
    inpContactNameE.focus();
}

function onContactClick(e) {
    if (e.target.tagName == 'UL') {
        currentId = e.target.id;
    } else {
        currentId = e.target.closest('UL').id;
    }

    if(e.target.classList.contains('btn-delete')) {
        onDeleteContact(currentId);
    } else if(e.target.classList.contains('btn-edit')) {
        onEditContact(currentId);
    }
}

function onDeleteContact(currentId) {
    contact.deleteContact(currentId)
        .then(result => {
            if(result.acknowledged = 'true') {
                readContacts(contacts);
            }
        })
}

function onEditContact() {
    changeContactContE.classList.remove('edit-contact');
}

function onSaveChanges() {
    newContact = {
        name: inpChangeContactNameE.value,
        lastName: inpChangeContactLastE.value,
        phone: inpChangeContactPhoneE.value,
        createDate: '',
        id: currentId,
    }

    contact.editContact(newContact, newContact.id)
        .then(result => result.json())
        .then(data => readContacts(contacts))

    clearValue(inpChangeContactNameE);
    clearValue(inpChangeContactLastE);
    clearValue(inpChangeContactPhoneE);
    changeContactContE.classList.add('edit-contact');
}

function renderContacts(data) {
    contactContE.innerHTML = '';
    data.map(e => renderElement(createElement(e), contactContE))
}

function createElement(e) {
    const element = `<ul id=${e.id} class="single-contact">
                    <button type="button" class="btn-delete">x</button>
                    <li>name: ${e.name}</li>
                    <li>lastName: ${e.lastName}</li>
                    <li>phone: ${e.phone}</li>
                    <li>createDate: ${e.createDate}</li>
                    <li>*id: ${e.id}</li>
                    <button type="button" class="btn btn-edit"}>Edit</button>
                    </ul>`
    return element;
}

function renderElement(element, container) {
    container.innerHTML += element;
}

function clearValue(inp) {
    inp.value = ''
}