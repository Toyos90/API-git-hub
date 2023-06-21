const APIURL = 'https://api.github.com/users/';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const searchInput = document.getElementById('search');
  const main = document.getElementById('main');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = searchInput.value;
    if (username) {
      await getUserData(username);
      searchInput.value = '';
    }
  });

  async function getUserData(username) {
    try {
      const response = await fetch(APIURL + username);
      if (response.ok) {
        const userData = await response.json();
        displayUserData(userData);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error(error);
    }
  }

  function displayUserData(user) {
    main.innerHTML = `
      <div class="card">
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        <div class="user-info">
          <h2>${user.name}</h2>
          <ul>
            <li><strong>Followers:</strong> ${user.followers}</li>
            <li><strong>Following:</strong> ${user.following}</li>
            <li><strong>Repos:</strong> ${user.public_repos}</li>
          </ul>
          <a href="${user.html_url}" target="_blank" class="repo">View Profile</a>
        </div>
      </div>
    `;
  }
});