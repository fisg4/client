import { Selector } from 'testcafe';

const email = "test@example.com";
const username = "testuser";
const password = "testpassword";

fixture `Register and login`
    .page `http://localhost:3000`;

test('Test registration and login', async t => {
    await t
        .setNativeDialogHandler(null)
        .click(Selector('#profile'))
        .click(Selector('#register'))
        .typeText(Selector('#email'), email)
        .typeText(Selector('#username'), username)
        .typeText(Selector('#password'), password)
        .typeText(Selector('#confirmPassword'), password)
        .click(Selector('#submit'))
        .expect(Selector('#alert').innerText).eql('Successful registration')
        .click(Selector('#alertOK'))
        .expect(Selector('#me'))
        .typeText(Selector('#email'), email)
        .typeText(Selector('#password'), password)
        .click(Selector('#login'))
        .expect(Selector('#alert').innerText).eql('Successful login');
});
