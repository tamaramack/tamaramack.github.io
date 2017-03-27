/**
 * ko-extended file for tamaramack.github.io on 27-Feb-17.
 */
(function () {

    function koVisibleInit(element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        $(element).toggle(value);
    }

    ko.bindingHandlers.slideVisible = {
        init: koVisibleInit,
        update: function (element, valueAccessor, allBindingsAccessor) {
            var value = valueAccessor(),
                allBindings = allBindingsAccessor(),
                valueUnwrapped = ko.unwrap(value),
                duration = allBindings.slideDuration || 400;

            var isVisible = $(element).is(':visible');
            if (valueUnwrapped && !isVisible) {
                $(element).slideDown(duration);
            }
            if (!valueUnwrapped && isVisible) {
                $(element).slideUp(duration);
            }
        }
    };

    ko.bindingHandlers.fadeVisible = {
        init: koVisibleInit,
        update: function (element, valueAccessor, allBindingsAccessor) {
            var value = valueAccessor(),
                allBindings = allBindingsAccessor(),
                valueUnwrapped = ko.unwrap(value),
                duration = allBindings.slideDuration || 400;

            var isVisible = $(element).is(':visible');
            if (valueUnwrapped && !isVisible) {
                $(element).fadeIn(duration / 2);
            }
            if (!valueUnwrapped && isVisible) {
                $(element).fadeOut(duration);
            }
        }
    };

    ko.bindingHandlers.fadeToClass = {
        update: function (element, valueAccessor, allBindings, viewModel) {
            var options = ko.unwrap(valueAccessor()),
                bindings = allBindings(),
                className = bindings.className || 'invisible',
                timer = bindings.timer || 200;

            if (options) {
                $(element).fadeTo(timer, 1, function () {
                    $(this).removeClass(className);
                });
            } else {
                $(element).fadeTo(timer, 0, function () {
                    $(this).addClass(className);
                });
            }
        }
    };
})();