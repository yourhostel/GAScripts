function getFormStructure() {
  var formId = "1R2OiC...";

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