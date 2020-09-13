export function modalWindow(options) {
    return `
        <div class="wart-modal__overlay"
        data-btn="modal-close">
            <div class="wart-modal__window">
                <div class="wart-modal__header">
                    <span class="wart-modal__title">
                        ${options.title || 'Модальное окно'}
                    </span>
                    <span class="wart-modal__close"
                    data-btn="modal-close">
                        &times;
                    </span>
                </div>
                <div class="wart-modal__body">
                    <div class="wart-modal__work-time">
                        <p>Work time</p>
                        <input type="text" data-input="work">
                    </div>
                    <div class="wart-modal__rest-time">
                        <p>Rest time</p>
                        <input type="text" data-input="rest">
                    </div>
                    <!--
                    <div class="wart-modal__notification">
                        <p>Notifications</p>
                        <input type="text" data-input1="notifications">
                    </div>
                    -->
                    <div class="wart-modal__audio-range">
                        <p>Audio range</p>
                        <input type="range" data-input="audio" value=${options.state.audio.range || 20}>
                        ${options.state.audio.range || 20}%
                    </div>
                </div>
                <div class="wart-modal__footer">
                    <button class="btn btn-primary"
                    data-btn="modal-ok">Ok</button>
                    <button class="btn btn-primary"
                    data-btn="modal-close">Cancel</button>
                </div>
            </div>
        </div>
    `;
}
