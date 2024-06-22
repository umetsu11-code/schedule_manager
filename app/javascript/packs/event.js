document.addEventListener('DOMContentLoaded', () => {
  const deleteLinks = document.querySelectorAll('.delete-link');
  const modal = document.getElementById('delete-modal');
  const confirmDeleteButton = document.getElementById('confirm-delete');
  const cancelDeleteButton = document.getElementById('cancel-delete');
  let eventIdToDelete = null;

  deleteLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      eventIdToDelete = link.dataset.id;
      modal.style.display = 'block';
    });
  });

  confirmDeleteButton.addEventListener('click', () => {
    if (eventIdToDelete) {
      fetch(`/events/${eventIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': document.querySelector('[name=csrf-token]').content
        }
      }).then(response => {
        if (response.ok) {
          location.reload();
        } else {
          alert('削除に失敗しました。');
        }
      });
    }
  });

  cancelDeleteButton.addEventListener('click', () => {
    modal.style.display = 'none';
    eventIdToDelete = null;
  });
});
