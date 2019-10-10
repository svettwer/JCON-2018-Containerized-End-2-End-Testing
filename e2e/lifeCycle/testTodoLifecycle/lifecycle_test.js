(async () => {
    var testCase = new TestCase();
    var env = new Environment();
    var screen = new Region();

    var pdfFilePath = "~/todo-backup.pdf";
    try {

        // Add entry
        await _highlight(_textbox("title"));
        await _click(_textbox("title"));
        await _setValue(_textbox("title"), "Sample todo");

        await _highlight(_textarea("description"));
        await _click(_textarea("description"));
        await _setValue(_textarea("description"), "Sample todo description");

        await _highlight(_submit("Add"));
        await _click(_submit("Add"));
        await testCase.endOfStep("Add todo entry", 30);

        //load images
        await testCase.addImagePaths("centos_chrome");

        //open print preview
        await env.type("p", Key.CTRL);

        //save as pdf
        await screen.find("save_button").highlight().click();
        await env.sleep(1);
        await env.type("a", Key.CTRL) //mark filename in "save under" dialog
            .type(pdfFilePath + Key.ENTER) //type filename and press ENTER
            .sleep(1);
        await testCase.endOfStep("Create backup of todo entry", 30);

        //Complete entry
        await _highlight(_listItem("Sample todox"));
        await _highlight(_checkbox("complete"));
        await _click(_checkbox("complete"));
        await testCase.endOfStep("Complete todo entry", 30);

        //Delete entry
        await _highlight(_span("x"));
        await _click(_span("x"));
        await testCase.endOfStep("Delete todo entry", 30);

    } catch (e) {
        testCase.handleException(e);
    } finally {
        testCase.saveResult();
    }
})().then(done);
