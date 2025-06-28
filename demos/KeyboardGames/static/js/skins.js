
function showSkinModal(thisSkin, modal_id, closeFunction) {
    $('#modal-backdrop').off('click');
    $('#modal-backdrop').on('click', () => closeFunction());
    const $newSkin = $(thisSkin).clone();
    $newSkin.removeClass('not-available');
    $newSkin.removeClass('user-choice');
    $newSkin.addClass('user-skin');
    $(`#${modal_id} .skin`).replaceWith($newSkin);
    $(`#${modal_id}`).css('display', 'flex');
    $('#modal-backdrop').css('display', 'flex');           
    document.body.overflow = 'hidden';
}

function countSkins() {
    // count skins where with class 'user-skin' and number without class 'not-available'
    const userSkins = $('.skin.user-skin').length;
    $('#user-skin-count').text(`(${userSkins})`);
    $('#user-skin-count').show();
    const userPoints = parseInt($('#user-points').text());
    const purchaseableSkins = skins.filter(skin => !skin.user_skin && skin.points <= userPoints).length;    
    $('#purchaseable-skin-count').text(`(${purchaseableSkins})`);
    $('#purchaseable-skin-count').show();
}

function showPurchaseSkinModal(skinId) {
    const thisSkin = $(`#skin-id-${skinId}`);
    if (!thisSkin.hasClass('user-skin') && !thisSkin.hasClass('user-choice')) {
        $('#selected-skin-id').val(skinId);
        showSkinModal(thisSkin, 'select-skin-modal', closeSelectSkinModal);
    }
    
}

function closeSelectSkinModal() {
    $('#select-skin-modal').css('display', 'none');
    $('#select-skin-modal .skin').empty();
    $('#modal-backdrop').css('display', 'none');
    $('#modal-backdrop').off('click');
    document.body.overflow = 'auto';
}

function selectSkin(){
    const modal = $('#select-skin-modal');
    const $dot = modal.find('.dot');
    const skinId = $('#selected-skin-id').val();
    const $newDot = $dot.clone();
    $newDot.removeClass('user-skin');
    $newDot.removeClass('dot');
    $newDot.attr('id', 'dot');
    localStorage.setItem('keyboardGameSkin', $newDot[0].outerHTML);
    localStorage.setItem('keyboardGameSkinId', skinId);
    setSkin();
    closeSelectSkinModal();
}

const defaultSkin = '177';
setSkin();
function setSkin() {
    let skinId = localStorage.getItem('keyboardGameSkinId') || null;
    if(!skinId) {
        localStorage.setItem('keyboardGameSkinId', defaultSkin);
        skinId = defaultSkin;
    }
    console.log(`Setting skin to: ${skinId}`);
    $('.skin').each(function() {
        $(this).removeClass('user-choice');
        $(this).removeClass('user-skin');
        $(this).find('.skin-name').removeClass('user-skin');
        $(this).find('.dot').removeClass('user-skin');
        $(this).find('.points').removeClass('user-skin');
    });
    const $skin = $(`#skin-id-${skinId}`);
    $skin.addClass('user-skin');
    $skin.addClass('user-choice');
    $skin.find('.skin-name').addClass('user-skin');
    $skin.find('.dot').addClass('user-skin');
    $skin.find('.points').addClass('user-skin');
}