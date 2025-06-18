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

4) Додаємо скрипт [script.google.com](https://script.google.com), з [таким змістом](https://github.com/yourhostel/GAScripts/blob/main/google-sheets/edu-autograde-gas/FormToClassroom.gs)


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

### Тепер можна запустити скрипт і ми повинні отримати
<details>
<summary>повідомлення про дозволи</summary>

![Screenshot from 2025-05-29 15-15-23.png](screenshots/Screenshot%20from%202025-05-29%2015-15-23.png)

</details>

### Після згоди ми отримаємо повні масиви даних форми

![Screenshot from 2025-05-29 15-54-48.png](screenshots/Screenshot%20from%202025-05-29%2015-54-48.png)
---
# Google Workspace-організація з власним доменом (наприклад, *@tysser.com замість *@gmail.com)

Розширений функціонал облікового запису організації надає доступ до адміністративної консолі
https://admin.google.com

---
Для налаштування:
1. Переходимо за посиланням:  
   https://workspace.google.com/signup  
   та дотримуємося інструкцій: вказуємо назву організації, контактні дані, свій домен.

2. Для підтвердження домену Google надає TXT-запис, який потрібно додати в DNS-зону домену. Залежно від реєстратора спосіб додавання буде різний.

3. Після підтвердження домену потрібно додати MX-запис у DNS для налаштування корпоративної пошти. У найпростішому варіанті достатньо одного запису:
   * Тип: MX
   * Пріоритет: 1
   * Значення: smtp.google.com.`
4. Оскільки акаунт створюється для організації, необхідно буде надати дані юридичної особи та платіжну картку.
---

### Налаштування політики управління папками проекту
> Щоб гнучко можна було створювати структуру організації, додаємо можливість управління каталогами проекту

https://console.cloud.google.com/iam-admin/iam?orgonly=true&organizationId={id_organization}

> Отримати `id_organization` можна тут https://console.cloud.google.com
- `IAM & Admin` -> `Manage resources`

![Screenshot from 2025-06-18 03-19-45.png](screenshots/Screenshot%20from%202025-06-18%2003-19-45.png)
- `Resource Manager` -> `Folder Admin`

> Тепер легко створювати структуру проектів
- `IAM & Admin` -> `Manage resources`

![Screenshot from 2025-06-18 23-18-36.png](screenshots/Screenshot%20from%202025-06-18%2023-18-36.png)

> Включити потрібні API у проекті для нашого скрипту

- APIs & Services -> Library -> Google Workspace -> **Google Classroom API**
- APIs & Services -> Library -> Google Workspace -> **Google Forms API**

> За потреби можна включити й інші, наприклад:

- APIs & Services -> Library -> Admin SDK -> **Admin SDK API**
- APIs & Services -> Library -> Google Workspace -> **Google Drive API**
- APIs & Services -> Library -> Google Workspace -> **Gmail API**

> Застосовуємо політики до нашого створеного проекту