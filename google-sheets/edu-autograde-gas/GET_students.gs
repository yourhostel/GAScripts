function listStudents() {
    const courseId = "769...";
    const token = ScriptApp.getOAuthToken();

    const url = `https://classroom.googleapis.com/v1/courses/${courseId}/students`;

    const response = UrlFetchApp.fetch(url, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    Logger.log(response.getContentText());
}