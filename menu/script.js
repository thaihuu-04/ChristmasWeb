// Get modal and buttons
const popupModal = new bootstrap.Modal(document.getElementById('popupModal'));
const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtns = document.querySelectorAll('#closePopupBtn, #closePopupBtnFooter');

// Open popup
openPopupBtn.addEventListener('click', () => {
    popupModal.show();
});

// Close popup
closePopupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        popupModal.hide();
    });
});
