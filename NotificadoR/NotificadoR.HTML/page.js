$(function () {
    var client = new WindowsAzure.MobileServiceClient('https://notificador.azure-mobile.net/', 'DpxvfRquJnLnSoyKfTHNdFsKCavOTX75'),
        todoItemTable = client.getTable('todoitem');

    var chat = $.connection.notificadoRHTMLHub;
    $.connection.hub.start();

    chat.client.broadcastMessage = function (message) {
        refreshTodoItems();
        toastr.info(message);
    };
    
    // Read current data and rebuild UI.
    // If you plan to generate complex UIs like this, consider using a JavaScript templating library.
    function refreshTodoItems() {
        var query = todoItemTable.where({ complete: false });

        query.read().then(function (todoItems) {
            var listItems = $.map(todoItems, function (item) {
                return $('<li>')
                    .attr('data-todoitem-id', item.id)
                    .append($('<button class="item-delete">Delete</button>'))
                    .append($('<input type="checkbox" class="item-complete">').prop('checked', item.complete))
                    .append($('<div>').append($('<input class="item-text">').val(item.text)));
            });

            $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
            $('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
        }, handleError);
    }

    function handleError(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        $('#errorlog').append($('<li>').text(text));
    }

    function getTodoItemId(formElement) {
        return $(formElement).closest('li').attr('data-todoitem-id');
    }

    // Handle insert
    $('#add-item').submit(function (evt) {
        var textbox = $('#new-item-text'),
            itemText = textbox.val();
        if (itemText !== '') {
            todoItemTable.insert({ text: itemText, complete: false }).then(refreshTodoItems, handleError);
        }
        textbox.val('').focus();
        evt.preventDefault();
        chat.server.send('Record Inserted');
    });

    // Handle update
    $(document.body).on('change', '.item-text', function () {
        var newText = $(this).val();
        todoItemTable.update({ id: getTodoItemId(this), text: newText }).then(null, handleError);
        chat.server.send('Record Updated');
    });

    $(document.body).on('change', '.item-complete', function () {
        var isComplete = $(this).prop('checked');
        todoItemTable.update({ id: getTodoItemId(this), complete: isComplete }).then(refreshTodoItems, handleError);
        chat.server.send('Record Updated');
    });

    // Handle delete
    $(document.body).on('click', '.item-delete', function () {
        todoItemTable.del({ id: getTodoItemId(this) }).then(refreshTodoItems, handleError);
        chat.server.send('Record Deleted');
    });

    // On initial load, start by fetching the current data
    refreshTodoItems();
});