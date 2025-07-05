document.querySelector('.toggle-theme').addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
});

fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('projects-list');
    list.innerHTML = '';
    data.projects.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${p.title}</strong><br>
        ${p.description}<br>
        <a href="${p.live}" target="_blank">Live Demo</a> | 
        <a href="${p.github}" target="_blank">GitHub</a>
      `;
      list.appendChild(li);
    });
  });
