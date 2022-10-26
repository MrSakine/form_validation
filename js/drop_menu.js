const menu = $("#drop_menu_btn");
const menu_items = $("#drop_menu");

function toggleDropDownMenu() {
    menu_items.toggle("500", "swing");
}

(function() {
    menu_items.hide("0");

    menu.on("click", toggleDropDownMenu);
})();