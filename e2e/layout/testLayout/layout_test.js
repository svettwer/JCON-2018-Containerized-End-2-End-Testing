(async () => {
    var testCase = new TestCase();

    try {
        await _navigateTo("http://todo-app-int.192.168.99.110.nip.io/todolist");
        //Check laylout
        await _highlight(_heading1("TODO list"), 100);
        await _highlight(_list("list-group"), 100);
        await _highlight(_heading2("New TODO entry"), 100);
        await _highlight(_label("Title"), 100);
        await _highlight(_textbox("title"), 100);
        await _highlight(_label("Description"), 100);
        await _highlight(_textarea("description"), 100);
        await _highlight(_submit("Add"), 100);
        await testCase.endOfStep("Test todo page layout", 30);

    } catch (e) {
        testCase.handleException(e);
    } finally {
        testCase.saveResult();
    }
})().then(done);


