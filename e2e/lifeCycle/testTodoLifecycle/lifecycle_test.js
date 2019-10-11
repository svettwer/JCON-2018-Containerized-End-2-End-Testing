(async () => {
    var testCase = new TestCase();
    var env = new Environment();
    var screen = new Region();

    var pdfFilePath = "~/todo-backup.pdf";

    const clickImage = async function (imageName) {
        const image = await screen.find(imageName);
        await image.click();
        await _wait(1000);
    };

    try {
        await _navigateTo("http://todo-app-int.192.168.99.110.nip.io/todolist");
        // Add entry
        await _highlight(_textbox("title"), 100);
        await _click(_textbox("title"));
        await _setValue(_textbox("title"), "Sample todo");

        await _highlight(_textarea("description"), 100);
        await _click(_textarea("description"));
        await _setValue(_textarea("description"), "Sample todo description");

        await _highlight(_submit("Add"), 100);
        await _click(_submit("Add"));
        await testCase.endOfStep("Add todo entry");

        //open print preview
        await env.type("p", Key.CTRL);
        await env.sleep(2);

        //save as pdf
        await clickImage("testTodoLifecycle/ubuntu_chrome/save_button.png");
        await env.type("a", Key.CTRL);
        await env.paste(pdfFilePath);
        await env.type(Key.ENTER);
        await env.sleep(2);
        await testCase.endOfStep("Create backup of todo entry");

        //Complete entry
        await _highlight(_checkbox("complete"), 100);
        await _click(_checkbox("complete"));
        await env.sleep(1);
        await testCase.endOfStep("Complete todo entry");

        //Delete entry
        await _highlight(_span("x"), 100);
        await _click(_span("x"));
        await env.sleep(1);
        await testCase.endOfStep("Delete todo entry", 30);


    } catch (e) {
        testCase.handleException(e);
    } finally {
        testCase.saveResult();
    }
})().then(done);
