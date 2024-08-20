document.getElementById('userForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const username = document.getElementById('username').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const emailId = document.getElementById('emailId').value;

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, phoneNumber, emailId }),
    });

    if (response.ok) {
      loadUsers(); // Refresh the user list
      document.getElementById('userForm').reset(); // Clear the form
    } else {
      console.error('Failed to create user');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

async function loadUsers() {
  try {
    const response = await fetch('/api/users');
    const users = await response.json();

    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.innerHTML = `
        ${user.name} (${user.username}) - ${user.emailId}
        <button onclick="editUser('${user.id}')">Edit</button>
        <button onclick="deleteUser('${user.id}')">Delete</button>
      `;
      userList.appendChild(userItem);
    });
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

async function deleteUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      loadUsers(); // Refresh the user list
    } else {
      console.error('Failed to delete user');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function editUser(id) {
  const name = prompt('Enter new name:');
  const username = prompt('Enter new username:');
  const phoneNumber = prompt('Enter new phone number:');
  const emailId = prompt('Enter new email ID:');

  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, phoneNumber, emailId }),
    });

    if (response.ok) {
      loadUsers(); // Refresh the user list
    } else {
      console.error('Failed to update user');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

window.onload = loadUsers; // Load users when the page loads
