
/*tooltip*/
function otm_tooltip() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl, {container:'body'}));
}


/*scripts after page load*/
$(function (){

    /*tooltips*/
    otm_tooltip();

});