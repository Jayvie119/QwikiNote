const form = document.getElementById('noteForm');
const notesList = document.getElementById('notesList');
const API = 'http://localhost:5000/api/notes';

// Fetch and show notes
async function loadNotes() {
  const res = await fetch(API);
  const notes = await res.json();
  const contentInput = document.getElementById('content');

  contentInput.addEventListener('input', () => {
    contentInput.style.height = 'auto';
    contentInput.style.height = contentInput.scrollHeight + 'px'; // Set to new height
  });

  notesList.innerHTML = notes.map(note => `
    <div class="note" data-id="${note._id}">
      <div class = "note-content">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <small>${new Date(note.date).toLocaleString()}</small>
      </div>
      <div class = "note-actions">
        <button class="edit-btn" data-id="${note._id}" data-title="${note.title}" data-content="${note.content}">Edit</button>
        <button class="delete-btn" data-id="${note._id}">Delete</button>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click',async() => {
      const id = button.getAttribute('data-id');
      console.log('Clicked delete on:', id);
      await deleteNote(id);
      loadNotes();
    });
  });

  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', async() => {
      const id = button.getAttribute('data-id');
      const title = button.getAttribute('data-title');
      const content = button.getAttribute('data-content');

      //Fill the form with the existing note values
      document.getElementById('title').value = title;
      document.getElementById('content').value = content;

      // Store ID somewhere so we know this is an update, not a new note
      form.setAttribute('data-editing-id', id);
    });
  });

  document.querySelectorAll('.note').forEach(noteE1 => {
    noteE1.addEventListener('click', () => {
      // Toggle 'show-actions' class on that note
      noteE1.classList.toggle('show-actions');
    });
  });

  document.querySelectorAll('.note-actions button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Stop the event from bubbling to parent note
    });
  });
}

// Add new note
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const editingId = form.getAttribute('data-editing-id');

  if (editingId) {
    // Editing existing note
    await fetch(`${API}/${editingId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title, content })
    });

    form.removeAttribute('data-editing-id'); // Clear editing mode
  } else {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
  }

  form.reset();
  loadNotes();
});

async function deleteNote(id) {
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok){
    console.error('Failed to delete note');
  }
}

// Initial load
loadNotes();
