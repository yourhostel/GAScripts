# Налаштування google cloud для забезпечення міжсервісної взаємодії GAS(Google Apps Script)
#### Цей проєкт використовує вбудовану авторизацію Google Apps Script (ScriptApp.getOAuthToken()), що автоматично забезпечує доступ до Google Classroom API та Forms API за вказаними скоупами.



1) Створення проекту google cloud [console.cloud.google.com](https://console.cloud.google.com)
   - `IAM & Admin` -> `Manage resources` -> ` Create project`
   - name:  example `ISTU-Kovalenko-Classroom`

   # ![Screenshot from 2025-05-29 14-13-38.png](screenshots/Screenshot%20from%202025-05-29%2014-13-38.png)
   # ![Screenshot from 2025-05-29 14-14-27.png](screenshots/Screenshot%20from%202025-05-29%2014-14-27.png)
   # ![Screenshot from 2025-05-29 14-14-51.png](screenshots/Screenshot%20from%202025-05-29%2014-14-51.png)

   > Якщо у вас налаштовано організацію — можна створити проєкт всередині неї або в окремій папці (folder).
   > Папки доступні тільки в рамках підтвердженої організаційної структури 
   > (No organization — це стандарт для особистих акаунтів).

2) Активація API:

   > Так як працювати скрипт буде з двома інтерфейсами 
   > (`Google Classroom API`, `Google Forms API`) нам їх треба активувати.
   - `APIs & Services` -> `Library` -> `Google Workspace` -> `Google Classroom API`
   - `APIs & Services` -> `Library` -> `Google Workspace` -> `Google Forms API`
   # ![Screenshot from 2025-05-29 14-31-25.png](screenshots/Screenshot%20from%202025-05-29%2014-31-25.png)
   # ![Screenshot from 2025-05-29 14-36-50.png](screenshots/Screenshot%20from%202025-05-29%2014-36-50.png)
   # ![Screenshot from 2025-05-29 14-37-15.png](screenshots/Screenshot%20from%202025-05-29%2014-37-15.png)

3) Налаштування OAuth consent screen

   > Щоб скрипт мав доступ до Forms API та Classroom API, треба оформити “запит дозволу” — OAuth consent screen.
   -  `APIs & Services` -> `OAuth consent screen`
   - App Information: 
     - `App name:` edu-autograde-gas 
     - `User support email:` support@example
       - next ->
   - Audience
     - `Internal` or `External`
       - next ->
   - Contact Information
     - `Email addresses:` support@example
       - next ->
   - Finish
     - - [ ] `I agree to the Google API Services: User Data Policy.`
       - Continue ->
   - Create

   # ![Screenshot from 2025-05-29 15-03-20.png](screenshots/Screenshot%20from%202025-05-29%2015-03-20.png)
   
   - Далі необхідно додати користувача, для цього переходимо в `Audience` і додаємо свою адресу електронної пошти.
   - `APIs & Services` -> `OAuth consent screen` -> `Audience` -> `Add users`

4) Додаємо скрипт [script.google.com](https://script.google.com)

```javascript
function getFormStructure() {
  var formId = "1R2OiClmTbz";

  const url_form = `https://forms.googleapis.com/v1/forms/${formId}`;
  const url_answers = `https://forms.googleapis.com/v1/forms/${formId}/responses`;

  const token = ScriptApp.getOAuthToken();

  const res_form = UrlFetchApp.fetch(url_form, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
    muteHttpExceptions: true,
  });

  Logger.log(res_form.getResponseCode());
  Logger.log(res_form.getContentText());

  const res_answers = UrlFetchApp.fetch(url_answers, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
    muteHttpExceptions: true,
  });

  Logger.log(res_answers.getResponseCode());
  Logger.log(res_answers.getContentText());
}
```

- У `appsscript.json` вказати `oauthScopes`. Для цього в `Налаштуваннях проекту` треба активувати чекбокс `Показувати файл маніфесту appsscript.json у редакторі`
```json
{
  "timeZone": "Europe/Kyiv",
  "dependencies": {
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
   "oauthScopes": [
    "https://www.googleapis.com/auth/forms.body.readonly",
    "https://www.googleapis.com/auth/forms.responses.readonly",
    "https://www.googleapis.com/auth/script.external_request"
  ]
}
```
> Також, тут у налаштуваннях, змінюємо номер проекту за замовчуванням, 
> на номер проекту створеного раніше в консолі `google cloud`

### Тепер можна запустити скрипт і ми повинні отримати повідомлення про дозволи
![Screenshot from 2025-05-29 15-15-23.png](screenshots/Screenshot%20from%202025-05-29%2015-15-23.png)

### Після згоди ми отримаємо повні масиви даних форми

![Screenshot from 2025-05-29 15-54-48.png](screenshots/Screenshot%20from%202025-05-29%2015-54-48.png)