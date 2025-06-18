function getFormStructure() {
  var formId = "199mXFNE7bUgV-6EsowEanT50u06SwIqmEV-z0xFuVdA";

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
  //Logger.log(res_form.getContentText());

  const res_answers = UrlFetchApp.fetch(url_answers, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
    muteHttpExceptions: true,
  });

  const answersJson = JSON.parse(res_answers.getContentText());

  // Виведення JSON без фільтрації, з 2 пробілами між рівнями вкладеності для дебагу
  // Logger.log(JSON.stringify(answersJson, null, 2));

  const responses = answersJson.responses;

  for (const response of responses) {
    const email = response.respondentEmail || "немає";
    const score = response.totalScore ?? 0;
    Logger.log(`Email: ${email}, Score: ${score}`);
  }

}