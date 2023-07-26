import { ContactsItem, ContactsList, DeleteBtn } from './ContactList.styled';
import { deleteContact } from 'components/redux/phoneBookSlice';

import { useDispatch, useSelector } from 'react-redux';

const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.phoneBook.contacts);
  const filter = useSelector(state => state.phoneBook.filter);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const contactsToRender = getFilteredContacts();

  return (
    <ContactsList>
      {contactsToRender.map(({ id, name, number }) => (
        <ContactsItem key={id}>
          {name}: {number}
          <DeleteBtn type="button" onClick={() => dispatch(deleteContact(id))}>
            Delete
          </DeleteBtn>
        </ContactsItem>
      ))}
    </ContactsList>
  );
};

export default ContactList;
