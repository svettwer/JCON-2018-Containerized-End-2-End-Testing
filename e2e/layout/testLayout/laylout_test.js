_dynamicInclude($includeFolder);
var testCase = new TestCase(50, 70);

try {

    //Check laylout
    _highlight(_heading1("TODO list"));
    _highlight(_list("list-group"));
    _highlight(_heading2("New TODO entry"));
    _highlight(_label("Title"));
    _highlight(_textbox("title"));
    _highlight(_label("Description"));
    _highlight(_textarea("description"));
    _highlight(_submit("Add"));
    testCase.endOfStep("Test todo page layout", 30);

} catch (e) {
    testCase.handleException(e);
} finally {
    testCase.saveResult();
}
