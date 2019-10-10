(async () => {
    var testCase = new TestCase();

    try {
        await _navigateTo("http://todo-app-int.192.168.99.108.nip.io/todolist");
        //Check laylout
        await _highlight(_heading1("TODO list"));
        await _highlight(_list("list-group"));
        await _highlight(_heading2("New TODO entry"));
        await _highlight(_label("Title"));
        await _highlight(_textbox("title"));
        await _highlight(_label("Description"));
        await _highlight(_textarea("description"));
        await _highlight(_submit("Add"));
        await testCase.endOfStep("Test todo page layout", 30);

    } catch (e) {
        testCase.handleException(e);
    } finally {
        testCase.saveResult();
    }
})().then(done);


