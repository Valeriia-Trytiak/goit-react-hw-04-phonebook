import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Container } from './Container/Container.styled';

export const App = () => {
  const [contacts, setContacts] = useState(()=>{
    const saveContacts = localStorage.getItem('contacts-list');
    return JSON.parse(saveContacts) || [ ]
     });
  const [filter, setFilter] = useState('');

  //Записую у локальне сховище дані зі стейту
    useEffect(()=> {
    localStorage.setItem('contacts-list', JSON.stringify(contacts));
    },
    [contacts]
  );


  //Додаю контакт до стану
  const addNewContact = newContact => {
    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (nameExists) {
      alert(`${newContact.name}' is arleady in contacts.`);
    } else {
      setContacts(prevState => [...prevState, { ...newContact, id: nanoid() }]);
    }
  };

  // Записую до стану значення пошуку
  const uppdateFilter = searchName => {
    setFilter(searchName);
  };

  //Видаляю контакт
  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = filter
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onUpdateContactList={addNewContact} />
      <h2>Contacts</h2>
      <Filter onSearchContact={uppdateFilter} filterName={filter} />
      <ContactList users={visibleContacts} onDeleteContact={deleteContact} />
    </Container>
  );
};
