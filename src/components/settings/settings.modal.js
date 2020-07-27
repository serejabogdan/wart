export function modalWindow(options) {
    return `
        <div class="wart-modal__overlay">
            <div class="wart-modal__window">
                <div class="wart-modal__header">
                    <span class="wart-modal__title">${options.total || 'Модальное окно'}</span>
                    <span class="wart-modal__close" data-btn="modal-close">&times;</span>
                </div>
                <div class="wart-modal__body">
                    <div class="wart-modal__work-time">
                        <p>Work time</p>
                        <input type="text">
                    </div>
                    <div class="wart-modal__rest-time">
                        <p>Rest time</p>
                        <input type="text">
                    </div>
                    <div class="wart-modal__notification">
                        <p>Notifications</p>
                        <input type="text">
                    </div>
                </div>
                <div class="wart-modal__footer">
                    <button class="btn btn-primary" data-btn="modal-close">Ok</button>
                    <button class="btn btn-primary" data-btn="modal-close">Cancel</button>
                </div>
            </div>
        </div>
    `;
}
