var container = $('.pane-vScroll'),

    last = parseInt($('#record_table tr:last').attr('data-id'));
    scrollTo = $('tr[data-id ="'+last+'"]');

container.scrollTop(
    scrollTo.offset().top - container.offset().top + container.scrollTop()
);

// Or you can animate the scrolling:
container.animate({
    scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
});