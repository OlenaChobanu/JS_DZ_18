class Contacts {
    
    #endpoint = 'http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/contacts';
    
    getContacts() {
        return fetch(this.#endpoint).then(r => r.json());
    }

    createContact(contact) {
        return fetch(this.#endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        });
    }

    editContact(contact, id) {
        return fetch(`${this.#endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
        });
    }

    deleteContact(id) {
        console.log('delete id: ', id);
        return fetch(`${this.#endpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(r => r.json());
    }
}