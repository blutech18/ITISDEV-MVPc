// ===== PLAYER ADMIN JS =====

// ----- Search & Filter -----
function applyFilters() {
    const search = document.getElementById('searchInput').value.toLowerCase().trim();
    const position = document.getElementById('filterPosition').value;
    const status = document.getElementById('filterStatus').value;

    const rows = document.querySelectorAll('#playerTableBody tr[data-id]');
    let visibleCount = 0;

    rows.forEach(row => {
        const firstName = row.dataset.firstname.toLowerCase();
        const lastName = row.dataset.lastname.toLowerCase();
        const fullName = `${firstName} ${lastName}`;
        const rowPosition = row.dataset.position;
        const rowStatus = row.dataset.status;

        const matchesSearch = !search || fullName.includes(search);
        const matchesPosition = !position || rowPosition === position;
        const matchesStatus = !status || rowStatus === status;

        if (matchesSearch && matchesPosition && matchesStatus) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    document.getElementById('noResults').style.display = visibleCount === 0 ? 'block' : 'none';
}

document.getElementById('searchInput')?.addEventListener('input', applyFilters);
document.getElementById('filterPosition')?.addEventListener('change', applyFilters);
document.getElementById('filterStatus')?.addEventListener('change', applyFilters);

// ----- Toast -----
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = isError ? '#e74c3c' : '#0b5d3b';
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3500);
}

// ----- Modal helpers -----
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById('addErrorMsg') && (document.getElementById('addErrorMsg').style.display = 'none');
    document.getElementById('editErrorMsg') && (document.getElementById('editErrorMsg').style.display = 'none');
}

document.getElementById('openAddModal')?.addEventListener('click', () => openModal('addModal'));
document.getElementById('closeAddModal')?.addEventListener('click', () => closeModal('addModal'));
document.getElementById('closeEditModal')?.addEventListener('click', () => closeModal('editModal'));
document.getElementById('closeDeleteModal')?.addEventListener('click', () => closeModal('deleteModal'));
document.getElementById('closeDeleteModal2')?.addEventListener('click', () => closeModal('deleteModal'));

// Close modal on backdrop click
['addModal', 'editModal', 'deleteModal'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', function (e) {
        if (e.target === this) closeModal(id);
    });
});

// ----- ADD PLAYER -----
async function addPlayer() {
    const firstName  = document.getElementById('addFirstName').value.trim();
    const lastName   = document.getElementById('addLastName').value.trim();
    const jerseyNumber = document.getElementById('addJersey').value.trim();
    const position   = document.getElementById('addPosition').value;
    const yearLevel  = document.getElementById('addYearLevel').value;
    const course     = document.getElementById('addCourse').value.trim();
    const heightCm   = document.getElementById('addHeight').value.trim();
    const weightKg   = document.getElementById('addWeight').value.trim();

    const errEl = document.getElementById('addErrorMsg');

    if (!firstName || !lastName || !jerseyNumber || !position || !yearLevel || !heightCm || !weightKg) {
        errEl.textContent = 'Please fill in all required fields.';
        errEl.style.display = 'block';
        return;
    }

    try {
        const res = await fetch('/api/players/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, jerseyNumber: Number(jerseyNumber), position, yearLevel, course, heightCm: Number(heightCm), weightKg: Number(weightKg) })
        });
        const data = await res.json();

        if (!res.ok) {
            errEl.textContent = data.message || 'Failed to add player.';
            errEl.style.display = 'block';
            return;
        }

        closeModal('addModal');
        showToast(`${firstName} ${lastName} added successfully!`);
        setTimeout(() => location.reload(), 1200);
    } catch (err) {
        errEl.textContent = 'Network error. Please try again.';
        errEl.style.display = 'block';
    }
}

// ----- EDIT PLAYER -----
function openEditModal(btn) {
    const row = btn.closest('tr');
    document.getElementById('editPlayerId').value   = row.dataset.id;
    document.getElementById('editFirstName').value  = row.dataset.firstname;
    document.getElementById('editLastName').value   = row.dataset.lastname;
    document.getElementById('editJersey').value     = row.dataset.jersey;
    document.getElementById('editPosition').value   = row.dataset.position;
    document.getElementById('editYearLevel').value  = row.dataset.yearlevel;
    document.getElementById('editCourse').value     = row.dataset.course || '';
    document.getElementById('editHeight').value     = row.dataset.height;
    document.getElementById('editWeight').value     = row.dataset.weight;
    document.getElementById('editStatus').value     = row.dataset.status;
    openModal('editModal');
}

async function updatePlayer() {
    const id         = document.getElementById('editPlayerId').value;
    const firstName  = document.getElementById('editFirstName').value.trim();
    const lastName   = document.getElementById('editLastName').value.trim();
    const jerseyNumber = document.getElementById('editJersey').value.trim();
    const position   = document.getElementById('editPosition').value;
    const yearLevel  = document.getElementById('editYearLevel').value;
    const course     = document.getElementById('editCourse').value.trim();
    const heightCm   = document.getElementById('editHeight').value.trim();
    const weightKg   = document.getElementById('editWeight').value.trim();
    const status     = document.getElementById('editStatus').value;

    const errEl = document.getElementById('editErrorMsg');

    if (!firstName || !lastName || !jerseyNumber || !position || !yearLevel || !heightCm || !weightKg) {
        errEl.textContent = 'Please fill in all required fields.';
        errEl.style.display = 'block';
        return;
    }

    try {
        const res = await fetch(`/api/players/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, jerseyNumber: Number(jerseyNumber), position, yearLevel, course, heightCm: Number(heightCm), weightKg: Number(weightKg), status })
        });
        const data = await res.json();

        if (!res.ok) {
            errEl.textContent = data.message || 'Failed to update player.';
            errEl.style.display = 'block';
            return;
        }

        closeModal('editModal');
        showToast(`${firstName} ${lastName} updated successfully!`);
        setTimeout(() => location.reload(), 1200);
    } catch (err) {
        errEl.textContent = 'Network error. Please try again.';
        errEl.style.display = 'block';
    }
}

// ----- DELETE PLAYER -----
function openDeleteModal(id, name) {
    document.getElementById('deletePlayerId').value = id;
    document.getElementById('deleteConfirmText').textContent = `Are you sure you want to delete "${name}"? This action cannot be undone.`;
    openModal('deleteModal');
}

async function confirmDelete() {
    const id = document.getElementById('deletePlayerId').value;

    try {
        const res = await fetch(`/api/players/delete/${id}`, { method: 'DELETE' });
        const data = await res.json();

        if (!res.ok) {
            closeModal('deleteModal');
            showToast(data.message || 'Cannot delete player.', true);
            return;
        }

        closeModal('deleteModal');
        showToast('Player deleted successfully!');
        setTimeout(() => location.reload(), 1200);
    } catch (err) {
        closeModal('deleteModal');
        showToast('Network error. Please try again.', true);
    }
}